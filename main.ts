
serial.redirectToUSB()
let mode = ShowMode.LOGGED
datalogger.mirrorToSerial(true) // monitor Log output

basic.showString("Hello!")
Show.see(mode, "STARTING UP...")
pause(1000)

// connect to the ICM and separately to the MAG
let sensor = new ICM20948(ICM20948_I2C_ADDR, true) // address Mag directly
// let sensor = new ICM20948(ICM20948_I2C_ADDR, false) // address Mag indirectly
pause(1000)

if (sensor.status == 192) {
    basic.showIcon(IconNames.Happy)
    pause(1000)
}

// try a simple multi-byte read 
let rawT = sensor.readTemperature()
//Show.see(mode,"rawT:" + rawT)
let t = Math.floor(rawT*100)/100
Show.see(mode,"temp:" + t)

enum Tests {
    SENSE,
    ACCEL,
    GYRO,
    MAG
}

let accelData: number[]
let gyroData: number[]
let magData:number[]

// select sensor to test
let test = 0
let testsOn = ['S', 'A', 'G', 'M']
let testsOff = ['s', 'a', 'g', 'm']
basic.showString(testsOff[test])
pause(1000)
basic.clearScreen()
let active = false
sensor.dumpMagWordsBE('MAG',0,16)

input.onButtonPressed(Button.AB, function() {
    // clear down the log-file
    datalogger.deleteLog()
    datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
    basic.showIcon(IconNames.Scissors)
})

// Button A cycles to next testsOff
input.onButtonPressed(Button.A, function () {
    active = false
    test = (test+1) % 4
    basic.showString(testsOff[test])
    pause(1000)
    basic.clearScreen()
})

// Button B toggles current test on/off
input.onButtonPressed(Button.B, function () {
    if (active) {
        active = false
    } else {
        active = true
    }
})

serial.writeLine('trial dump of bank 0...')
sensor.useBank(0)
let icmreg = pins.createBuffer(32)
for (let i=0; i<32; i++) {
    icmreg[i] = i2cReadByte(sensor.icm, i)
    pause(500)
    serial.writeLine(toHex(icmreg[i]))
}


//let magReg = i2cReadBuffer(sensor.mag, 0, 32)
serial.writeLine('icm[00..] = [' + dumpBufferAsHex(icmreg, 0, 16) + ']')
serial.writeLine('icm[16..] = [' + dumpBufferAsHex(icmreg, 16, 16) + ']')


while(true) {
    if (active) {
        switch (test) {
            case Tests.SENSE:
                accelData = sensor.senseAccel()
                gyroData = sensor.senseGyro()
                magData = sensor.senseMag()
                datalogger.log(
                    datalogger.createCV("AX", accelData[0]),
                    datalogger.createCV("AY", accelData[1]),
                    datalogger.createCV("AZ", accelData[2]),
                    datalogger.createCV("GX", gyroData[0]),
                    datalogger.createCV("GY", gyroData[1]),
                    datalogger.createCV("GZ", gyroData[2]),
                    datalogger.createCV("MX", magData[0]),
                    datalogger.createCV("MY", magData[1]),
                    datalogger.createCV("MZ", magData[2]))
                break
            case Tests.ACCEL:
                accelData = sensor.senseAccel()
                datalogger.log(
                    datalogger.createCV("AX", accelData[0]),
                    datalogger.createCV("AY", accelData[1]),
                    datalogger.createCV("AZ", accelData[2]))
                break
            case Tests.GYRO:
                gyroData = sensor.senseGyro()
                datalogger.log(
                    datalogger.createCV("GX", gyroData[0]),
                    datalogger.createCV("GY", gyroData[1]),
                    datalogger.createCV("GZ", gyroData[2]))
                break
            case Tests.MAG:
                let magreg = pins.createBuffer(32)
                for (let i=0; i<32; i++){
                    magreg[i] = i2cReadByte(sensor.mag, i)
                    serial.writeLine(toHex(magreg[i]))
                }
                //let magReg = i2cReadBuffer(sensor.mag, 0, 32)
                serial.writeLine('icm[00..] = [' + dumpBufferAsHex(magreg, 0, 16) + ']')
                serial.writeLine('icm[16..] = [' + dumpBufferAsHex(magreg, 16, 16) + ']')
                break
        }
        basic.clearScreen()
        pause(200)
        basic.showString(testsOn[test])
    } else {
        basic.clearScreen()
        pause(200)
        basic.showString(testsOff[test])
    }
}

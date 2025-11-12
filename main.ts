
serial.redirectToUSB()
let mode = ShowMode.LOGGED
datalogger.mirrorToSerial(true) // monitor Log output

basic.showString("Hello!")
Show.see(mode, "STARTING UP...")
pause(1000)

// connect to the ICM and separately to the MAG
let sensor = new ICM20948(ICM20948_I2C_ADDR, true) // address Mag directly
pause(1000)

if ((sensor.status & STATUS_MAG_FOUND) > 0) {
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

input.onButtonPressed(Button.AB, function() {
    // clear down the log-file
    datalogger.deleteLog()
    datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
    basic.showIcon(IconNames.Scissors)
})

// Button A cycles to next testsOff
input.onButtonPressed(Button.A, function () {
    active = false
    test = (test+1) % 3
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
                magData = sensor.senseMag()
                datalogger.log(
                    datalogger.createCV("MX", magData[0]),
                    datalogger.createCV("MY", magData[1]),
                    datalogger.createCV("MZ", magData[2]))
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

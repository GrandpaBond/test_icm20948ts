
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
let t = Math.floor(rawT/10)*10
Show.see(mode,"temp:" + t)

enum Tests {
    ACCEL,
    GYRO,
    MAG
}

// select sensor to test
let test = 0
let tests = ['A', 'G', 'M']
let active = false

input.onButtonPressed(Button.A, function () {
    pause(500)
    test = (test+1) % 3
    basic.showString(tests[test])
})

let accelData: number[]
let gyroData: number[]
let magData:number[]

input.onButtonPressed(Button.B, function () {
    if (active) {
        active = false
    } else {
        active = true
    }
})

while(true) {
    if (active) {
        // acquire the data
        switch (test) {
            case Tests.ACCEL:
                accelData = sensor.senseAccel()
                datalogger.log(datalogger.createCV("AX", accelData[0]))
                datalogger.log(datalogger.createCV("AY", accelData[1]))
                datalogger.log(datalogger.createCV("AZ", accelData[2]))
                //report3("Accel", accelData)
                break
            case Tests.GYRO:
                gyroData = sensor.senseGyro()
                //report3("Gyro", gyroData)
                break
            case Tests.MAG:
                magData = sensor.senseMag()
                //report3("Mag", magData)
                break
        }
        basic.showIcon(IconNames.Yes)
        pause(1000)
        basic.clearScreen()
    }
}

   
/** display X,Y,Z data values  */
function report3(title:string, data: number[]) {
    let tags = ['X', 'Y', 'Z']
    pause(1000)
    Show.see(mode,title)
    for(let i=0; i<3; i++) {
        let v = Math.round(data[i]*1000)/1000
        Show.see(mode,title[0] + tags[i] + "=" + v)
    }
    pause(1000)
}
//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
let mode = ShowMode.SERIAL

basic.showString("Hello!")
Show.see(mode, "STARTING UP...")
pause(1000)

// connect to the ICM and separately to the MAG
let sensor = new ICM20948(ICM20948_I2C_ADDR, true)

basic.showString("init:"+sensor.status)
//sensor.dumpRegisters(0)
//sensor.dumpRegisters(1)
//sensor.dumpRegisters(2)
//sensor.dumpRegisters(3)
//sensor.dumpRegisters(4)
//basic.showString("dumped")
pause(1000)

if ((sensor.status & STATUS_MAG_FOUND) > 0) {
    basic.showIcon(IconNames.Happy)
    pause(1000)
}

// try a simple multi-byte read 
let rawT = sensor.readTemperature()
//Show.see(mode,"rawT:" + rawT)
let t = Math.floor(rawT/10)*10
//Show.see(mode,"temp:" + t)


enum Tests {
    ACCEL,
    GYRO,
    MAG
}

// select sensor to test
let test = 0
let tests = ['A', 'G', 'M']

input.onButtonPressed(Button.A, function () {
    pause(500)
    test = (test+1) % 3
    basic.showString(tests[test])
})

let magData:number[]
let icmData:number[]

input.onButtonPressed(Button.B, function () {
    // acquire the data
    switch(test) {
       
        case Tests.ACCEL:
        case Tests.GYRO:
            icmData = sensor.senseIcm() // 6 values
            break
        case Tests.MAG:
            magData = sensor.senseMag() // 3 values
            break
    }

    basic.showIcon(IconNames.Yes)

    // now display it
    switch (test) {
        case Tests.ACCEL:
            report3("Accel", icmData.slice(0,3))
            break
        case Tests.GYRO:
            report3("Gyro", icmData.slice(3))
            break
        case Tests.MAG:
            report3("Mag", magData)
            break
    }
})
   
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
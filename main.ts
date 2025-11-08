//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
Show.use(ShowMode.SERIAL)

basic.showString("Hello!")
Show.see("STARTING UP...")

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


Show.see("temp:" + Math.floor(sensor.readTemperature()/10)*10)

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
    Show.see(title)
    for(let i=0; i<3; i++) {
        Show.see(title[0] + tags[i] + "=" + data[i])
    }
    pause(1000)
}
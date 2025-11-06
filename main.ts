//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
basic.showString("Hello!")
serial.writeLine("STARTING UP...")

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
//datalogger.log(datalogger.createCV("sensor init:", sensor.status))
basic.clearScreen()
let magData:number[], icmData:number[]

input.onButtonPressed(Button.A, function() {
    basic.showString('A')
    icmData = sensor.senseIcm() 
    report("Accel", icmData.slice(0,2))
    pause(1000)
    report("Gyro", icmData.slice(3))
    pause(1000)
    basic.clearScreen()
})

input.onButtonPressed(Button.B, function () {
    basic.showString('B')
    magData = sensor.senseMag()
    report("Mag", magData)
    pause(1000)
    basic.clearScreen()
})

function report(title:string, data: number[]) {
    let tags = ['X', 'Y', 'Z']
    serial.writeLine("")
    serial.writeLine(title+' Sensor Readings:')
    for(let i=0; i<data.length; i++) {
        serial.writeLine(tags[i%3]+" = "+ data[i])
    }
    serial.writeLine("")
}
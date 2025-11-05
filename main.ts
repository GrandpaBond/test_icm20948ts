//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
basic.showString("Hello!")
serial.writeLine("STARTING UP...")

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

let magData:number[], icmData:number[]

input.onButtonPressed(Button.A, function() {
    icmData = sensor.senseIcm() 
    report("Accel", icmData)
    report("Gyro", icmData.slice(3))
})

input.onButtonPressed(Button.B, function() {
    magData = sensor.senseMag()
    report("Mag", magData)
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
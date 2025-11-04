//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
basic.showString("Hello!")
serial.writeLine("STARTING UP...")

let sensor = new ICM20948(ICM20948_I2C_ADDR, AK09916_I2C_ADDR)
basic.showString("init:"+sensor.status)

sensor.dumpRegisters(0)
//sensor.dumpRegisters(1)
sensor.dumpRegisters(2)
sensor.dumpRegisters(3)
sensor.dumpRegisters(4)

basic.showString("dumped")
pause(1000)
//datalogger.log(datalogger.createCV("sensor init:", sensor.status))

let magData:number[], icmData:number[]
input.onButtonPressed(Button.A, function() {
    icmData = sensor.senseIcm() 
    magData = sensor.senseMag()
    report(icmData,magData)
})

function report(icmData:number[],magData: number[]) {
    let icmTags = ['AX', 'AY', 'AZ,', 'GX', 'GY', 'GZ']
    let magTags = ['MX', 'MY', 'MZ']
    serial.writeLine("")
    serial.writeLine('Sensor Readings:')
    for(let i=0; i<6;i++) {
        serial.writeLine(icmTags[i]+" = "+ icmData[i])
    }
    for (let i = 0; i < 3; i++) {
        serial.writeLine(magTags[i] + " = " + magData[i])
    }
    
    serial.writeLine("")
}
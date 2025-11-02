//datalogger.mirrorToSerial(true)
serial.redirectToUSB()
serial.writeLine("STARTING UP...")
serial.writeLine("toHex(42) = "+toHex(42))


//datalogger.log(datalogger.createCV("starting up", 12345))
let sensor = new ICM20948(ICM20948_I2C_ADDR, AK09916_I2C_ADDR)
sensor.dumpRegisters(0)
pause(1000)
//datalogger.log(datalogger.createCV("sensor init:", sensor.status))
basic.showString("init:"+sensor.status)

let mag:number[], gyro:number[]
input.onButtonPressed(Button.A, function() { 
    mag = sensor.read_magnetometer_data()
    gyro = sensor.read_accelerometer_gyro_data()
    report(gyro,mag)
})

function report(gyro:number[],mag: number[]){
    datalogger.log(
        datalogger.createCV("accX", gyro[0]),
        datalogger.createCV("accY", 0),
        datalogger.createCV("accZ", 0),
        datalogger.createCV("gyrX", 0),
        datalogger.createCV("gyrY", 0),
        datalogger.createCV("gyrZ", 0),
        datalogger.createCV("magX", 0),
        datalogger.createCV("magY", 0),
        datalogger.createCV("magZ", 0)
    )
}
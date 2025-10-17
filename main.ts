const ICM_ADDRESS = 0x68

let sensor = new ICM20948(ICM_ADDRESS)
datalogger.mirrorToSerial(true)
let mag:number[] = []
let gyro:number[] = []

mag = sensor.read_magnetometer_data()
gyro = sensor.read_accelerometer_gyro_data()
input.onButtonPressed(Button.A, function() {
// take a reading
    datalogger.log(
        datalogger.createCV('mx', mag[0]),
        datalogger.createCV('my', mag[1]),
        datalogger.createCV('mz', mag[2]),
        datalogger.createCV('gx', gyro[0]),
        datalogger.createCV('gy', gyro[1]),
        datalogger.createCV('gz', gyro[2]),
        datalogger.createCV('sx', gyro[3]),
        datalogger.createCV('sy', gyro[4]),
        datalogger.createCV('sz', gyro[5])
    )

})

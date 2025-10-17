/*
function fetch_byte_reg(address: number, byte_reg: number, select: number): number {

    pins.i2cWriteNumber(MPX_ADDR, select, NumberFormat.Int8LE, false)
    //  basic.pause(1)
    pins.i2cWriteNumber(AS5600_ADDR, byte_reg, NumberFormat.Int8LE, false)
    //  basic.pause(1)
    return Ubyte(pins.i2cReadNumber(AS5600_ADDR, NumberFormat.Int8LE, false))
}
control.waitMicros(4)
*/

/*
function fetch_word_reg(word_reg: number, select: number): number {

    pins.i2cWriteNumber(MPX_ADDR, select, NumberFormat.Int8LE, false)
    //  basic.pause(1)
    pins.i2cWriteNumber(AS5600_ADDR, word_reg, NumberFormat.Int8LE, false)
    //  basic.pause(1)
    return Uword(pins.i2cReadNumber(AS5600_ADDR, NumberFormat.Int16BE, false))
}
*/
/*
function getreg(reg: number): number {
    pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt8BE);
}
*/

/*
function getInt8LE(reg: number): number {
    pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int8LE);
}
*/

/*
function getUInt16LE(reg: number): number {
    pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt16LE);
}
*/

/*
function getInt16LE(reg: number): number {
    pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int16LE);
}
*/
/*********  lowest-level I2C transfers ***********/

/** Write value to this register on this I2C address. */
function i2cWriteByte(address:number, register:number, value:number) {
    let twoBytes = pins.createBuffer(2)
    twoBytes[0] = register
    twoBytes[1] = value
    pins.i2cWriteBuffer(address, twoBytes, false)
    control.waitMicros(100)
}

/**  Read byte from a register on this I2C address. */
function i2cReadByte(address: number, register: number) {
    pins.i2cWriteNumber(address, register, NumberFormat.UInt8LE) // select register
    return pins.i2cReadNumber(address, NumberFormat.UInt8LE, false) // read and return
}

/** Read multiple byte(s) from this I2C address, starting from given register. */
function i2cReadData(address: number, register: number, length = 1) {
    let buffer = pins.createBuffer(length)
    pins.i2cWriteNumber(address, register, NumberFormat.UInt8LE) // select register
    buffer = pins.i2cReadBuffer(address, length, false) //read and return
    return buffer
}

/** Modify flags in a register on this I2C address */
function i2cRegisterFlags(address: number, register: number, unsetMask: number, setMask: number) {
    let setting = i2cReadByte(address, register)
    setting &= (0xff ^ unsetMask)
    setting |= setMask
    i2cWriteByte(address, register, setting)
    control.waitMicros(10)
}

function toHex(byte:number){
    const hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    // HACK: insert a short delay here to help prevent serial output overruns elsewhere...
    basic.pause(10)
    return '0x'+hex[byte>>4]+hex[byte&0xf]
}
//************************************************************************** */

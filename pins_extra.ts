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

/** Read a Buffer (array of bytes) from this I2C address, starting from given register. */
function i2cReadBuffer(address: number, register: number, length = 1):Buffer {
    let buffer = pins.createBuffer(length)
    pins.i2cWriteNumber(address, register, NumberFormat.UInt8LE)
    buffer = pins.i2cReadBuffer(address, length, true)
    return buffer
}

/** Read an array of big-endian words from this I2C address, starting from given register. */
function i2cReadWordsBE(address:number, register:number, length: number): number[] {
    let buffer = i2cReadBuffer(address, register, 2*length)
    let vals = buffer.toArray(NumberFormat.UInt16BE)
    return vals
}

/** Read an array of little-endian words from this I2C address, starting from given register. */
function i2cReadWordsLE(address:number, register:number, length:number): number[] {
    let buffer = i2cReadBuffer(address, register, 2*length)
    let vals = buffer.toArray(NumberFormat.UInt16LE)
    return vals
}

/** Modify flags in a register on this I2C address */
function i2cRegisterFlags(address: number, register: number, unsetMask: number, setMask: number) {
    let setting = i2cReadByte(address, register)
    setting &= (0xff ^ unsetMask)
    setting |= setMask
    i2cWriteByte(address, register, setting)
    control.waitMicros(10)
}

/** utility */
function toHex(byte:number): string{
    const hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    // HACK: insert a short delay here to help prevent serial output overruns elsewhere...
    //basic.pause(10)
    return '0x'+hexit(byte>>4) + hexit(byte&0xf)
}

function dumpBuffer(bytes:Buffer, from:number, count:number):string {
    let output:string
    for(let i=0; i<count; i++){
        let byte = bytes.getNumber(NumberFormat.Int8LE, from + i)
        output += hexit(byte >> 4)
        output += hexit(byte & 0xf)
    }
    return output
}

/** convert nibble to hex digit character */
function hexit(nibble:number):string {
    const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    return (hex[nibble & 0xf])
}
//************************************************************************** */

/*********  lowest-level I2C transfers ***********/

/** Write value to this register on this I2C device. */
function i2cWriteByte(device:number, register:number, value:number) {
    let twoBytes = pins.createBuffer(2)
    twoBytes[0] = register
    twoBytes[1] = value
    pins.i2cWriteBuffer(device, twoBytes, false)
    control.waitMicros(100)
}

/**  Read byte from a register on this I2C device. */
function i2cReadByte(device:number, register:number) {
    pins.i2cWriteNumber(device, register, NumberFormat.UInt8LE) // select register
    return pins.i2cReadNumber(device, NumberFormat.UInt8LE, false) // read and return
}

/** Read a Buffer (array of bytes) from this I2C device, starting from given register. */
function i2cReadBuffer(device:number, register:number, length:number):Buffer {
    let buffer = pins.createBuffer(length)
    pins.i2cWriteNumber(device, register, NumberFormat.UInt8LE)
    buffer = pins.i2cReadBuffer(device, length, true)
    return buffer
}

/** Write a Buffer (array of bytes) to this I2C device, starting from given register. */
function i2cWriteBuffer(device:number, register:number, data:Buffer) {
    pins.i2cWriteNumber(device, register, NumberFormat.UInt8LE)
    pins.i2cWriteBuffer(device, data, false)
}

/** Read an array of big-endian words from this I2C device, starting from given register. */
function i2cReadWordsBE(device:number, register:number, length: number): number[] {
    let buffer = i2cReadBuffer(device, register, 2*length)
    let vals = buffer.toArray(NumberFormat.Int16BE)
    return vals
}

/** Read an array of little-endian words from this I2C device, starting from given register. */
function i2cReadWordsLE(device:number, register:number, length:number): number[] {
    let buffer = i2cReadBuffer(device, register, 2*length)
    let vals = buffer.toArray(NumberFormat.Int16LE)
    return vals
}

/** Modify flags in a register on this I2C device */
function i2cAdjustFlags(device: number, register: number, unsetMask: number, setMask: number) {
    let setting = i2cReadByte(device, register)
    setting &= (0xff ^ unsetMask)
    setting |= setMask
    i2cWriteByte(device, register, setting)
    control.waitMicros(10)
}

/****************** utility **********************/

function dumpBank(sensor: ICM20948, bank: number) {
    sensor.useBank(bank)
    let addr = bank*256
    for (let ro = 0; ro < 16; ro++) {
        let offset = ro*16
        let hexRow = i2cReadBuffer(sensor.icm, offset, 256)
        pause(20)
        let output = offset.toString() + dumpBufferAsHex(hexRow,0,16)
        
        serial.writeLine(offset + ': 0x' + hexBank.slice(offset, offset + 16))
    }

}

function toHex(byte:number): string{
    const hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    // HACK: insert a short delay here to help prevent serial output overruns elsewhere...
    //basic.pause(10)
    return '0x'+hexit(byte>>4) + hexit(byte&0xf)
}

function dumpBufferAsHex(bytes:Buffer, from:number, count:number):string {
    let output:string
    for(let i=0; i<count; i++){
        let byte = bytes.getNumber(NumberFormat.Int8LE, from + i)
        output += hexit(byte >> 4)
        output += hexit(byte & 0xf)
        if ((i%4) == 3) output += ' '
    }
    return output
}

/** convert nibble to hex digit character */
function hexit(nibble:number):string {
    const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    return (hex[nibble & 0xf])
}
//************************************************************************** */

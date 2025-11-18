/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb long!). 
 *  It gets loaded into the ICM's register-banks (16 to 72), but the first and last
 *  banks are partial: firmware code (currently) starts at register-address 0x1090,
 *  and its last byte lives (currently) at register-address 0x4861
 * 
*/
``
function dmpLoadFirmware(sensor:ICM20948) {
    let allHex = dmpHex.length
    let dmpAddr = DMP_START_ADDRESS + DMP_LOAD_START
    let hexOffset = 0
    let percent: number

    while (hexOffset <= allHex) {
        percent = Math.round(100 * hexOffset / allHex)
        let size = 256 - (dmpAddr & 0xff) // (generally a full 256)
        sensor.useBank(dmpAddr >> 8)
        i2cWriteBuffer(sensor.icm, (dmpAddr & 0xff), dmpHex.slice(hexOffset, size))
        pause(200)
        serial.writeLine('written ' + percent + '%')
        hexOffset += size
        dmpAddr += size
    }

    Show.see(mode,"DMP Firmware Upload Successful !")

}

/** read back each block and comfirm it matches what was written */
function dmpCheckFirmware(sensor: ICM20948) {
    let allHex = dmpHex.length
    let dmpAddr = DMP_START_ADDRESS + DMP_LOAD_START
    let hexOffset = 0
    let percent:number
    let good:boolean

    while (hexOffset <= allHex) {
        percent = Math.round(100 * hexOffset / allHex)
        let size = 256 - (dmpAddr & 0xff) // (generally a full 256)

        let here  = Buffer.create(size)
        here = dmpHex.slice(hexOffset, size)
        serial.writeLine(here.toHex())
        
        let bank = dmpAddr >> 8
        sensor.useBank(bank)
        let there = i2cReadBuffer(sensor.icm, (dmpAddr & 0xff), size)
        pause(200)
        serial.writeLine(there.toHex())

        good = there.equals(here)
        if (good){
            serial.writeLine('checked ' + percent + '%')
        } else {
            serial.writeLine('mismatch on bank ' + (dmpAddr >> 8))
            break
        }
        hexOffset += size
        dmpAddr += size
    }

    if (good) {
        Show.see(mode, "DMP Firmware Check Successful !")
    } else {
        Show.see(mode, "DMP Firmware Check Failed !")
    }
}
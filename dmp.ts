/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb long!). 
 *  It gets loaded into the ICM's register-banks 16 to 72, but the first and last
 *  banks are partial: firmware code (currently) starts at register-address 0x1090,
 *  and its last byte lives (currently) at register-address 0x4861
 * 
*/
``
function dmpLoadFirmware(sensor:ICM20948) {
    let all = dmpHex.length
    let into = DMP_START_ADDRESS + DMP_LOAD_START
    let from = 0
    let percent: number

    while (from <= all) {
        let size = 256 - (into & 0xff) // (generally a full 256)
        percent = Math.round(100 * from / all)
        sensor.useBank(into >> 8)
        i2cWriteBuffer(sensor.icm, (into & 0xff), dmpHex.slice(from, size))
        pause(200)
        serial.writeLine('written ' + percent + '%')
        from += size
        into += size
    }

    Show.see(mode,"DMP Firmware Upload Successful !")

}

/** read back eack block and comfirm it matches what was written */
function dmpCheckFirmware(sensor: ICM20948) {
    let all = dmpHex.length
    let into = DMP_START_ADDRESS + DMP_LOAD_START
    let from = 0
    let percent:number
    let good:boolean

    while (from <= all) {
        let size = 256 - (into & 0xff) // (generally a full 256)
        percent = Math.round(100 * from / all)

        let here  = Buffer.create(size)
        here = dmpHex.slice(from, size)
        serial.writeLine(here.toHex())
        let bank = into >> 8
        sensor.useBank(bank)
        let there = i2cReadBuffer(sensor.icm, (into & 0xff), size)
        pause(200)
        serial.writeLine(there.toHex())

        good = there.equals(here)
        if (good){
            serial.writeLine('checked ' + percent + '%')
        } else {
            serial.writeLine('mismatch on bank ' + (into >> 8))
            break
        }
        from += size
        into += size
    }

    if (good) {
        Show.see(mode, "DMP Firmware Check Successful !")
    } else {
        Show.see(mode, "DMP Firmware Check Failed !")
    }
}
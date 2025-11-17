/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb long!). 
 *  It gets loaded into the ICM's register-banks 0 to 56, but the first and last
 *  banks are partial: firmware code (currently) starts at register-address 0x90,
 *  and its last byte lives (currently) at register-address 0x3861
 * 
*/
``
function dmpLoadFirmware(sensor:ICM20948) {
    let all = dmpHex.length
    let into = DMP_LOAD_START
    let from = 0
    let bank = 0

    while (from <= all) {
        sensor.useBank(into >> 8)
        let size = 256 - (into && 0xff) // (generally a full 256)
        let percent = Math.round(100 * from / all) + '%'
        //Show.see(mode, percent)
        basic.showNumber(size)
        pause(500)
        basic.clearScreen()

        i2cWriteBuffer(sensor.icm, into, dmpHex.slice(from, size))
        
        from += size
        into += size
    }

    Show.see(mode,"DMP Firmware Upload Successful !")
}
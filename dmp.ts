/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb!). 
 *  It must be loaded into the ICM's register-banks 9 to 56, but the first and last
 *  banks are partial: firmware code starts at register-address 0x90, and its last
 *  byte lives at register-address 0x3861
 * 
*/
``
function DMP_load_firmware(sensor:ICM20948) {

    let mem_bank = 0
    let start_address = DMP_LOAD_START
    let data_pos = 0

    // Write DMP firmware to memory

    // dmpCode[0..14k+] ==> address 0x00:90 to 0x38:61

    let offset:number
    let bank = 0
    // download first (partial) block into bank 0
    let size = 256 - (DMP_LOAD_START && 0xff)
    let data = Buffer.create(size)
    i2cWriteBuffer(sensor.icm, DMP_LOAD_START, data)
    // download the full blocks that follow (banks 1 to 55)
    /* (build addresses as bank*256
    for (offset=0; offset<(dmpCode.length - 256); offset+=256) { // stop before last bank
        let data = dmpCode.slice(offset, offset + 256)

        //self.DMP_bank(mem_bank)
        // Write firmware in burst mode(up to 256 byte at a time : Damn fast)
        //self.write(0, ICM_MEM_START_ADDR, offset)
        //self.write_bytes(0, ICM_MEM_R_W, bytes(data))
        
        //data_pos += write_len
        mem_bank += 1
        start_address = 0
        //text = "\rDBG:\t ICM20948 : \t Uploading DMP Microcode {:.0f}%".format(100 * data_pos / len(dmp_img))
        //print(text, end = "\r")
    }
*/

    // self._dbg(1, "DMP Firmware Upload Successfull !")
}
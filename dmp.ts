function DMP_load_firmware(sensor:ICM20948) {

    let mem_bank = 0
    let start_address = DMP_LOAD_START
    let data_pos = 0

    // Write DMP firmware to memory

    let offset:number
    let bank = 0
    for (offset = 0; 
        offset < (dmpCode.length - DMP_MEM_BANK_SIZE); // stop before last bank
        offset += DMP_MEM_BANK_SIZE) {
        let data = dmpCode.slice(offset, offset + DMP_MEM_BANK_SIZE)

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


    // self._dbg(1, "DMP Firmware Upload Successfull !")
}
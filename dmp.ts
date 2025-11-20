/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb long!). 
 *  It gets loaded into the ICM's internal memory, but the first and last
 *  banks are partial: firmware code (currently) starts at DMP mem 0x1090,
 *  and its last byte lives (currently) at DMP mem 0x4861
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
        let size = 256 - (dmpAddr & 0xff) // (generally, a full 256-byte bank)
        sensor.useBank(dmpAddr >> 8)
        i2cWriteBuffer(sensor.icm, (dmpAddr & 0xff), dmpHex.slice(hexOffset, size))
        pause(200)
        serial.writeLine('written ' + percent + '%')
        hexOffset += size
        dmpAddr += size
    }

    Show.see(mode,"DMP Firmware Upload Successful (?)")

}

/** read back each block and comfirm it matches what was written */
function dmpCheckFirmware(sensor: ICM20948) {
    let allHex = dmpHex.length
    let dmpAddr = DMP_START_ADDRESS + DMP_LOAD_START
    let hexOffset = 0
    let percent:number
    let good = true

    while (good && (hexOffset <= allHex)) {
        percent = Math.round(100 * hexOffset / allHex)
        let size = 256 - (dmpAddr & 0xff) // (generally, a full 256-byte bank)

        let here  = Buffer.create(size) // what this bank should contain
        here = dmpHex.slice(hexOffset, size) 

        serial.writeLine(here.toHex())
        
        let bank = dmpAddr >> 8
        sensor.useBank(bank)
        // see what this bank actually contains
        let there = i2cReadBuffer(sensor.icm, (dmpAddr & 0xff), size)
        pause(200)
        
        serial.writeLine(there.toHex())

        good = there.equals(here)
        if (good){
            serial.writeLine('checked ' + percent + '%')
        } else {
            serial.writeLine('mismatch on bank ' + (dmpAddr >> 8))
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
/*

    def DMP_load_firmware(self, burstmode = True):

        mem_bank = 0
        start_address = DMP_LOAD_START
        data_pos = 0

        with open(DMP_ROM, 'rb') as f:
            dmp_img = f.read()

        # Write DMP firmware to memory
        while data_pos < len(dmp_img):
            write_len = min((DMP_MEM_BANK_SIZE - start_address, len(dmp_img[data_pos:])))
            data = dmp_img[data_pos:data_pos + write_len]
            address = start_address
            self.DMP_bank(mem_bank)

            #Write firmware Byte per byte (Original but slow)
            if not burstmode :
                for d in data:
                    self.write(0, ICM_MEM_START_ADDR, address)
                    self.write(0, ICM_MEM_R_W, d)
                    address += 1
            #Write firmware in burst mode (up to 256 byte at a time : Damn fast)
            else :
                self.write(0, ICM_MEM_START_ADDR, address)
                self.write_bytes(0, ICM_MEM_R_W, bytes(data))

            data_pos += write_len
            mem_bank += 1
            start_address = 0
            text = "\rDBG:\t ICM20948 : \t Uploading DMP Microcode {:.0f}%".format(100*data_pos/len(dmp_img))
            print(text, end="\r")
        self._dbg(1,"DMP Firmware Upload Successfull !")

*/

/* Write to DMP register
function DMP_write(sensor:ICM20948, register:number, data:number) {
    let dmp_bank = register >> 8
    sensor.DMP_bank(dmp_bank)
    let dmp_address = register & 0xFF
   //sensor._dbg(2, "Writing DMP Bank", hex(dmp_bank), "Adress", hex(dmp_address), "Data", bytes(data))
    sensor.write(0, ICM_MEM_START_ADDR, dmp_address)
    sensor.write_bytes(0, ICM_MEM_R_W, bytes(data))
}
        
// Read to DMP register
function DMP_read(self, register, length = 1) {
    dmp_bank = register >> 8
    self.DMP_bank(dmp_bank)
    dmp_address = register & 0xFF
    self._dbg(2, "Reading DMP Bank", hex(dmp_bank), "Adress", hex(dmp_address))
    self.write(0, ICM_MEM_START_ADDR, dmp_address)
    self._buffer = bytearray(length)
    self._bus.readfrom_mem_into(self._addr, ICM_MEM_R_W, self._buffer)
    return self._buffer
}
*/
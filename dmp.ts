/** The internal Digital Motion Processor (DMP) runs firmware that must be loaded. 
 *  The dmpCode[] array holds an image of this data (over 14kb long!). 
 *  It gets loaded into the ICM's internal memory in 256-byte chunks, but the first and last
 *  banks are partial: firmware code (currently) starts at DMP mem 0x1090,
 *  and its last byte lives (currently) at DMP mem 0x4861
 * 
 * ICM20948_MEM_START_ADDR
 * 
*/
``
function dmpLoadFirmware(sensor:ICM20948) {
    let allHex = dmpHex.length
    let dmpAddr = DMP_START_ADDRESS + DMP_LOAD_START
    let hexOffset = 0
    let percent: number
    let good = true
    let bankWas = -1

    while (good && (hexOffset <= allHex)) {  
        let dmpBank = dmpAddr >> 8 
        let dmpOffset = dmpAddr & 0xff // (generally, 0)

        let size = 256 - dmpOffset     // (generally, a full 2566-byte chunk)
        let chunk =  dmpHex.slice(hexOffset, size)


        serial.writeLine('-------- ' + dmpBank + ' --------')
        serial.writeLine(chunk.toHex())
        serial.writeLine('------------------------')

        // steer data into correct DMP memory bank 
        i2cWriteByte(sensor.icm, ICM20948_MEM_BANK_SEL, dmpBank)
        i2cWriteByte(sensor.icm, ICM20948_MEM_START_ADDR, dmpOffset)
        i2cWriteBuffer(sensor.icm, ICM20948_MEM_R_W, chunk)
        pause(200)

        // see what this bank now contains
        i2cWriteByte(sensor.icm, ICM20948_MEM_BANK_SEL, dmpBank)
        i2cWriteByte(sensor.icm, ICM20948_MEM_START_ADDR, dmpOffset)
        let found = i2cReadBuffer(sensor.icm, ICM20948_MEM_R_W, size)
        pause(200)

        serial.writeLine(found.toHex())
        serial.writeLine('------------------------')

        //good = found.equals(chunk)
        if (good) {
            percent = Math.round(100 * hexOffset / allHex)
            serial.writeLine('checked ' + percent + '%')
        } else {
            serial.writeLine('mismatch on bank ' + (dmpAddr >> 8))
        }

        hexOffset += size
        dmpAddr += size
    }

    if (good) {
        Show.see(mode, "DMP Firmware Load Successful !")
    } else {
        Show.see(mode, "DMP Firmware load Failed !")
    }

}

/** read back each block and comfirm it matches what was written */
function dmpCheckFirmware(sensor: ICM20948) {
    let allHex = dmpHex.length
    let dmpAddr = DMP_START_ADDRESS + DMP_LOAD_START
    let hexOffset = 0
    let percent:number
    let good = true

    while (good && (hexOffset <= allHex)) {
        let dmpBank = dmpAddr >> 8
        let dmpOffset = dmpAddr & 0xff // (generally, 0)
        let size = 256 - dmpOffset     // (generally, a full 256-byte bank)


        let here  = Buffer.create(size) // what this bank should contain
        here = dmpHex.slice(hexOffset, size) 

        serial.writeLine(here.toHex())


        // see what this bank actually contains
        i2cWriteByte(sensor.icm, ICM20948_MEM_BANK_SEL, dmpBank)
        i2cWriteByte(sensor.icm, ICM20948_MEM_START_ADDR, dmpOffset)
        let there = i2cReadBuffer(sensor.icm, ICM20948_MEM_R_W, size)
        
        pause(200)

        serial.writeLine(there.toHex())

        good = there.equals(here)
        if (good){
            percent = Math.round(100 * hexOffset / allHex)
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

 //Switch memory bank
    function DMP_bank(self, dmp_bank):
        if not self._dmp_bank == dmp_bank :
            self.write(0, ICM_MEM_BANK_SEL, dmp_bank)
            self._dmp_bank = dmp_bank


//Write to DMP register
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
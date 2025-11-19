enum ShowMode {
    NONE = 0,
    BASIC = 1,
    LOGGED = 2,
    SERIAL = 3
}
namespace Show{
    /** Display message in current output mode */
    export function see(mode:ShowMode, message:string) {
        switch(mode){
            case ShowMode.NONE:
                break
            case ShowMode.BASIC:
                basic.showString(message, 50)
                pause(1000)
                basic.clearScreen()
                break
            case ShowMode.LOGGED:
                datalogger.log(datalogger.createCV('message:',message))
                break
            case ShowMode.SERIAL:
                serial.writeLine(message)
                pause(100)
                break
        }
    }
}

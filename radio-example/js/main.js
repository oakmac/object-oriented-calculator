let radio1 = new Radio('radio1Container')
let radio2 = new Radio('radio2Container')
let radio3 = new Radio('radio3Container')

// turns the radio on / off
// radio1.on()
// radio1.off()

// volume is 1 - 10
radio1.volume() // returns the current volume
radio1.volume('10') // set the volume to "10"


// optionally: alias these
radio2.setVolume(-11)
radio2.setVolume(3)
radio1.getVolume()

radio1.turnUp() // turn the volume up one notch
radio1.turnDown() // turn the volumn down one notch

// frequency
radio1.frequency() // returns the current frequency
radio1.frequency('fm', 97.9) // set the frequency
radio1.frequency('fm', 104.1) // set the frequency

radio1.getFrequency()
radio2.setFrequency('fm', 97.9)
radio2.setFrequency('am', 1560)

radio1.tuneUp() // goes to the next highest frequency
radio1.tuneDown() // goes to the next lowest frequency

// frequencies outside the valid range should do nothing
// radio1.frequency('fm', 98.8) // FM stations cannot be even
radio1.frequency('am', 100) // out of range - does nothing

// 6 preset stations
radio1.getFavorites() // returns an array of the favorites
radio1.setFavorite(1) // sets the current station as "Favorite 1"
radio1.setFavorite(5)
radio1.setFavorite(22) // does nothing - there are only 6 favorite buttons

radio1.selectFavorite(1) // tune the radio to favorite 1
radio1.selectFavorite(4) // tune the radio to favorite 4

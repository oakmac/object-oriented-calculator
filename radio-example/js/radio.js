class Radio {

  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------
  constructor (elementId) {
    let el = document.getElementById(elementId)
    if (!el) {
      window.alert('Please pass a valid DOM id to the Radio() constructor. Exiting...')
      return null
    }

    // set some constants
    this.HOLD_TIME_MS = 2000
    this.NUM_FAVORITES = 6

    this.MIN_AM_FREQUENCY = 540
    this.MAX_AM_FREQUENCY = 1600
    this.AM_FREQUENCY_INTERVAL = 10

    this.MIN_FM_FREQUENCY = 87.9
    this.MAX_FM_FREQUENCY = 107.9
    this.FM_FREQUENCY_INTERVAL = 0.2

    // save references to DOM things
    this._el = el
    this._elId = elementId

    // build the html
    el.innerHTML = this._buildHTML()

    // add DOM events
    this._addEvents()

    // set initial favorites
    this._favorites = []
    for (let i = 0; i < this.NUM_FAVORITES; i++) {
      this._favorites.push({band: 'FM', frequency: this.MIN_FM_FREQUENCY})
    }

    // set the initial radio state
    this.setVolume(5)
    this.setFrequency('FM', 94.5) // The Buzz
  }

  // ---------------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------------

  // turn the radio on
  on () {

  }

  // turn the radio off
  off () {

  }

  // alias for getVolume and setVolume
  volume (newVolume) {
    if (newVolume === undefined) {
      return this.getVolume()
    } else {
      return this.setVolume(newVolume)
    }
  }

  getVolume () {
    return this._volume
  }

  setVolume (newVolume) {
    // make sure newVolume is an integer
    newVolume = parseInt(newVolume, 10)

    // make sure newVolume is a valid value
    if (newVolume < 0 || newVolume > 10) return

    this._volume = newVolume
    this._render()

    return newVolume
  }

  // alias for getFrequency and setFrequency
  frequency (band, newFrequency) {
    if (band === undefined) {
      return this.getFrequency()
    } else {
      return this.setFrequency(band, newFrequency)
    }
  }

  getFrequency () {
    return {band: this._band, frequency: this._frequency}
  }

  setFrequency (newBand, newFrequency) {
    // validate their band
    newBand = newBand + ''
    newBand = newBand.toUpperCase()
    if (newBand !== 'FM' && newBand !== 'AM') return

    // validate their frequency
    newFrequency = parseFloat(newFrequency)
    if (newBand === 'AM' && !this._validAMFrequency(newFrequency)) return
    if (newBand === 'FM' && !this._validFMFrequency(newFrequency)) return

    this._band = newBand
    this._frequency = newFrequency
    this._render()
  }

  turnUp () {
    let currentVolume = this._volume
    if (currentVolume === 10) return
    this.setVolume(currentVolume + 1)
  }

  turnDown () {
    let currentVolume = this._volume
    if (currentVolume === 0) return
    this.setVolume(currentVolume - 1)
  }

  tuneUp () {
    let currentBand = this._band
    let currentFrequency = this._frequency

    if (currentBand === 'AM' && currentFrequency === this.MAX_AM_FREQUENCY) {
      this.setFrequency('AM', this.MIN_AM_FREQUENCY)
    } else if (currentBand === 'AM') {
      let newFrequency = currentFrequency + this.AM_FREQUENCY_INTERVAL
      newFrequency = parseFloat(newFrequency.toFixed(1))
      this.setFrequency('AM', newFrequency)
    } else if (currentBand === 'FM' && currentFrequency === this.MAX_FM_FREQUENCY) {
      this.setFrequency('FM', this.MIN_FM_FREQUENCY)
    } else {
      let newFrequency = currentFrequency + this.FM_FREQUENCY_INTERVAL
      newFrequency = parseFloat(newFrequency.toFixed(1))
      this.setFrequency('FM', newFrequency)
    }
  }

  tuneDown () {
    let currentBand = this._band
    let currentFrequency = this._frequency

    if (currentBand === 'AM' && currentFrequency === this.MIN_AM_FREQUENCY) {
      this.setFrequency('AM', this.MAX_AM_FREQUENCY)
    } else if (currentBand === 'AM') {
      let newFrequency = currentFrequency - this.AM_FREQUENCY_INTERVAL
      newFrequency = parseFloat(newFrequency.toFixed(1))
      this.setFrequency('AM', newFrequency)
    } else if (currentBand === 'FM' && currentFrequency === this.MIN_FM_FREQUENCY) {
      this.setFrequency('FM', this.MAX_FM_FREQUENCY)
    } else {
      let newFrequency = currentFrequency - this.FM_FREQUENCY_INTERVAL
      newFrequency = parseFloat(newFrequency.toFixed(1))
      this.setFrequency('FM', newFrequency)
    }
  }

  selectFavorite (favNum) {
    // TODO: make sure favNum is valid
    var favIdx = favNum - 1
    let favBand = this._favorites[favIdx].band
    let favFrequency = this._favorites[favIdx].frequency
    this.setFrequency(favBand, favFrequency)
  }

  setFavorite (num) {
    num = parseInt(num, 10)
    if (num < 1 || num > this.NUM_FAVORITES) return

    let currentBand = this._band
    let currentFrequency = this._frequency
    let favIdx = num - 1
    this._favorites[favIdx] = {band: currentBand, frequency: currentFrequency}

    this._render()
  }

  getFavorites () {
    return this._favorites
  }

  // ---------------------------------------------------------------------------
  // Private Methods
  // ---------------------------------------------------------------------------

  _addEvents () {
    let id = this._elId
    let that = this

    // volume
    $('#' + id + ' .volume-up-btn').click(this.turnUp.bind(this))
    $('#' + id + ' .volume-down-btn').click(this.turnDown.bind(this))

    // tuner
    $('#' + id + ' .tune-up-btn').click(this.tuneUp.bind(this))
    $('#' + id + ' .tune-down-btn').click(this.tuneDown.bind(this))

    // presets
    $('#' + id + ' .preset-btn').click(function (evt) {
      let presetNumber = evt.target.dataset.num
      that.selectFavorite(presetNumber)
    })
    $('#' + id + ' .preset-btn').on('mousedown', function (evt) {
      let presetNumber = evt.target.dataset.num
      that._presetMousedownBtnNum = presetNumber
      that._areWePressingDown = true

      window.setTimeout(function () {
        if (that._areWePressingDown && that._presetMousedownBtnNum === presetNumber) {
          that.setFavorite(presetNumber)
        }
      }, that.HOLD_TIME_MS)
    })
    $('#' + id + ' .preset-btn').on('mouseup', function (evt) {
      that._areWePressingDown = false
      that._presetMousedownBtnNum = null
    })
  }

  _render () {
    this._renderVolume()
    this._renderFrequency()
    this._renderFavorites()
  }

  _renderVolume () {
    $('#' + this._elId + ' .volume-display').html(this._volume)
  }

  _renderFrequency () {
    $('#' + this._elId + ' .frequency-display').html(this._band + ' ' + this._frequency)
  }

  _renderFavorites () {
    let id = this._elId
    let currentBand = this._band
    let currentFrequency = this._frequency

    for (let i = 0; i < this.NUM_FAVORITES; i++) {
      let favBand = this._favorites[i].band
      let favFrequency = this._favorites[i].frequency

      // highlight the button
      if (currentBand === favBand && currentFrequency === favFrequency) {
        $('#' + id + ' .fav-btn-' + (i + 1)).addClass('active')
      } else {
        // remove button highlight
        $('#' + id + ' .fav-btn-' + (i + 1)).removeClass('active')
      }
      // TODO: clear the timeout on mouseleave button event
    }
  }

  _buildHTML () {
    return htmlStation() +
           htmlCurrentVolume() +
           htmlVolumeControl() +
           htmlTuner() +
           htmlFavorites()

    function htmlStation() {
      return `<div class="chunk">
                  <label>Current Station:</label>
                  <div class="frequency-display 8bit-text"></div>
              </div>`
    }

    function htmlCurrentVolume() {
      return `<div class="chunk">
                 <label>Current Volume:</label>
                 <div class="volume-display 8bit-text"></div>
              </div>`
    }

    function htmlVolumeControl() {
      return `<div class="chunk">
                  <label>Volume:</label>
                  <button class="volume-up-btn">Up</button>
                  <button class="volume-down-btn">Down</button>
              </div>`
    }

    function htmlTuner() {
      return `<div class="chunk">
                  <label>Tune:</label>
                  <button class="tune-up-btn">Up</button>
                  <button class="tune-down-btn">Down</button>
              </div>`
    }

    function htmlFavorites() {
      return `<div class="chunk">
                  <label>Favorites:</label>
                  <div class="presets">
                      <button class="preset-btn fav-btn-1" data-num="1">1</button>
                      <button class="preset-btn fav-btn-2" data-num="2">2</button>
                      <button class="preset-btn fav-btn-3" data-num="3">3</button>
                      <button class="preset-btn fav-btn-4" data-num="4">4</button>
                      <button class="preset-btn fav-btn-5" data-num="5">5</button>
                      <button class="preset-btn fav-btn-6" data-num="6">6</button>
                  </div>
              </div>`
    }
  }

  _validAMFrequency (f) {
    return typeof f === 'number' &&
           f >= this.MIN_AM_FREQUENCY &&
           f <= this.MAX_AM_FREQUENCY &&
           f % this.AM_FREQUENCY_INTERVAL === 0
  }

  _validFMFrequency (f) {
    // TODO: validate the odd number
    return typeof f === 'number' &&
           f >= this.MIN_FM_FREQUENCY &&
           f <= this.MAX_FM_FREQUENCY
  }

} // end class Radio

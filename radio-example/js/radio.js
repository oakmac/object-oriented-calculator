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

    // save references to DOM things
    this._el = el
    this._elId = elementId

    // build the html
    el.innerHTML = this._buildHTML()

    // add DOM events
    this._addEvents()

    // set any initial radio state
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

  }

  setVolume (newVolume) {

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

  }

  setFrequency (band, newFrequency) {

  }

  turnUp () {
    console.log(this._elId + ': turn it up for what!')
  }

  turnDown () {
    console.log(this._elId + ': turn it down you kids :(')
  }

  tuneUp () {
    console.log(this._elId + ': TUNE UP!')
  }

  tuneDown () {
    console.log(this._elId + ': TUNE DOWN')
  }

  selectFavorite (favNum) {
    console.log(this._elId + ': favorite ' + favNum)
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
                  <div class="8bit-text">FM 97.9</div>
              </div>`
    }

    function htmlCurrentVolume() {
      return `<div class="chunk">
                 <label>Current Volume:</label>
                 <div class="8bit-text">8</div>
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
                      <button class="preset-btn" data-num="1">1</button>
                      <button class="preset-btn" data-num="2">2</button>
                      <button class="preset-btn" data-num="3">3</button>
                      <button class="preset-btn" data-num="4">4</button>
                      <button class="preset-btn" data-num="5">5</button>
                      <button class="preset-btn" data-num="6">6</button>
                  </div>
              </div>`
    }
  }

} // end class Radio

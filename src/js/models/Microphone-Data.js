var Model = require( '_PEAK/models/Model' );
var DataSource = require( '_PEAK/services/Data-Sources/Microphone-Data-Source' );

class MicrophoneDataModel extends Model {
	constructor() {
		super();
		this.dataSource = new DataSource();
	}
}

module.exports = MicrophoneDataModel;

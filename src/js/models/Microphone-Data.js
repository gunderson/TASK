var Model = require( '_TASK/models/Model' );
var DataSource = require( '_TASK/services/Data-Sources/Microphone-Data-Source' );

class MicrophoneDataModel extends Model {
	constructor() {
		super();
		this.dataSource = new DataSource();
	}
}

module.exports = MicrophoneDataModel;

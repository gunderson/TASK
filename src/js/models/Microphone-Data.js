var _ = require( 'lodash' );
var Model = require( '_TASK/models/Model' );
var DataSource = require( '_TASK/services/Data-Sources/Microphone-Data-Source' );

class MicrophoneDataModel extends Model {
	constructor( attributes, options ) {
		super( _.extend( {
			streamData: []
		}, attributes ), _.mergeWith( {
			dataSource: new DataSource(),
			events: [ {
				target: 'dataSource',
				eventName: 'data',
				handler: 'update'
			} ],
			bindFunctions: [ 'update' ]
		}, options, Model.mergeRules ) );
		this.delegateEvents();
	}

	update( data ) {
		this.streamData = data;
	}
}

module.exports = MicrophoneDataModel;

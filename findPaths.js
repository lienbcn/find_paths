/**
 * [fnFindPaths find all routes that start and end in the same node. The route cannot pass a middle node multiple times]
 * @param  {array of string} aNodes 
 * @param  {array of array of string} aPaths
 * @return {array of array of string}        array of routes
 */
var fnFindPaths = function(aNodes, aPaths){
	var fnGetChoices = function(sNode){ //get all nodes that are connected to sNode
		var aNodeChoices = [];
		aPaths.forEach(function(aPath){
			var nIndex = aPath.indexOf(sNode);
			if (nIndex === 0) {
				aNodeChoices.push(aPath[1]);
			}
			else if (nIndex === 1) {
				aNodeChoices.push(aPath[0]);
			}
		});
		return aNodeChoices;
	};
	var aRoutes = [];
	aNodes.forEach(function(sStartNode){
		var fnNextStep = function fnNextStep(sNode, aInitialRoute){
			var aActualRoute = JSON.parse(JSON.stringify(aInitialRoute));
			aActualRoute.push(sNode);
			//debugger;
			if (aActualRoute.length > 1 && sNode === sStartNode){ //has arrived to the end (start), so that route is completed
				aRoutes.push(aActualRoute);
				return 'completed';
			}
			if (aActualRoute.slice(0, -1).indexOf(sNode) !== -1) { //the route has already passed by this node
				aActualRoute.splice(-1, 1); //delete last node
				return 'repeat';
			}
			var aChoices = fnGetChoices(sNode); //get all nodes that are connected to sNode
			aChoices.forEach(function(sNewNode){
				fnNextStep(sNewNode, aActualRoute);
			});
		};
		fnNextStep(sStartNode, []); //recursive funcion. it will call itself until end	
	});
	return aRoutes;
};

//try it
//var aNodes = ['A', 'B', 'C', 'D'];
//var aPaths = [['A','B'], ['A','C'], ['D','B'], ['D','A']];
//fnFindPaths(aNodes, aPaths);

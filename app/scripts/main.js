/*global graph, graphInit, _, console, alert*/

function _Int(n) {
    'use strict';
    return Math.floor(n);
}


window.model = (function() {
    'use strict';

    var model,
        sliderN = $('#N'),
        valueNText = $('#N-value'),
        sliderMsgFail = $('#msg-fail'),
        valueMsgFailText = $('#msg-fail-value'),
        graphHtmlNode = $('.d3_graph'),
        graphSize = 500,
        initNodeVal = 5;

    // init ui
    sliderN.on('mousemove', function() {
        valueNText.text(_Int($(this).val()));
    });

    sliderMsgFail.on('mousemove', function() {
        valueMsgFailText.text(_Int($(this).val()) + '%');
    });

    // draw graph
    reset();

    // this will serve as a controller
    return {
        nodeClicked: nodeClicked,
        reset: reset,
        read: read,
        ae: ae,
        graph: graph
    };


    /** helper function  */
    function setNode(id, val) {
        graph.set(id, val);
        model[id] = val;
    }

    /** part of api */
    function reset(n) {
        if (!n) {
            n = sliderN.val();
        }

        graphHtmlNode.empty();
        window.graph = graphInit(_Int(n), graphSize);

        model = _.times(n, function(index) {
            var vv = _Int(initNodeVal * Math.random());
            graph.set(index, vv);
            return vv;
        });
    }

    /** part of api */
    function nodeClicked(id) {
        console.log('[CLICK]: ' + id);
        var val = graph.get(id) + 1;
        setNode(id, val);
        // messages
        graph.clear();
        var minPercentage = sliderMsgFail.val() / 100.0;
        _.chain(model)
            .map(function(num, index) {
                return index;
            }).reject(function(index) {
                return index === id;
            }).map(function(index) {
                var ok = Math.random() > minPercentage;
                graph.add(index, id, ok);
                return ok ? index : undefined;
            }).filter(function(index) {
                return index !== undefined;
            }).each(function(index) {
                setNode(index, val);
            });
    }

    /** part of api */
    function read() {
        console.log('[READ]');
        graph.clear();
        var readNodeId = _Int(Math.random() * model.length),
            minPercentage = sliderMsgFail.val() / 100.0,
            v = _.chain(model)
            .map(function(val, index) {
                var ok = Math.random() > minPercentage,
                    readSelf = index === readNodeId; // is checking itself for val
                if (!readSelf) {
                    graph.add(index, readNodeId, ok);
                }
                var valid = ok || readSelf;
                // console.log(index + ': ' + (valid ? val : '-') + '/' + val +
                // ' ( ok:' + ok + ', self: ' + readSelf + ', expr: ' + valid + ')');
                return valid ? val : undefined;
            }).filter(function(val) {
                return val !== undefined;
            }).reduce(function(acc, v) {
                return Math.max(acc, v); // TODO not max, but the lastest !
            }, 0).value();

        alert(v);
    }

    /** part of api */
    function ae() {
        console.log('[AE]');
        // messages
        graph.clear();
        var minPercentage = sliderMsgFail.val() / 100.0;
        _.chain(model)
            .each(function(val1, index) {
                var pos2 = randomTargetForNode(index),
                    val2 = model[pos2],
                    res = Math.max(val1, val2),
                    ok = Math.random() > minPercentage;
                graph.add(pos2, index, ok);
                if (ok) {
                    setNode(pos2, res);
                }
            });

        function randomTargetForNode(nodePos) {
            var len = model.length,
                delta = 1 + Math.random() * (len - 1),
                ind = _Int(nodePos + delta);
            // console.log(nodePos + ' + ' + delta + ' = ' + ind)
            return ind % model.length;
        }
    }

})();

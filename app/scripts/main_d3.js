/* global d3,_,_Int,console */
/* exported graphInit*/

// http://bl.ocks.org/mbostock/7607999
// http://jsfiddle.net/w2rfwokx/1/
// svg:foreginobject:
// https://groups.google.com/forum/#!topic/d3-js/d2ceKITfTx0

function graphInit(nodeCount, diameter) {
    'use strict';

    var radius = diameter / 2,
        innerRadius = radius - 50,
        nodeMap = {
            '': { // root node
                name: '',
                children: []
            }
        },
        data = createNodeData(),
        bundle = d3.layout.bundle(),
        cluster = d3.layout.cluster() // use conections
            .size([360, innerRadius]) // create ring
            .sort(null)
            .value(function(d) {
                return d.size;
            }),
        lineDrawInstructions = d3.svg.line.radial()
            .interpolate('bundle')
            // .tension(0.85)
            .radius(function(d) {
                return d.y;
            })
            .angle(function(d) {
                return d.x / 180 * Math.PI;
            });

    // main svg element
    var svgElement = d3.select('.d3_graph').append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'block-center')
        .append('g') // main svg:graphics
        .attr('transform', 'translate(' + radius + ',' + radius + ')');
    // draw shaded circle in background to better visualize cluster
    svgElement.append('circle')
        .attr('cx', 0)
        .attr('cy', 2)
        .attr('r', innerRadius)
        .style('opacity', 0.1)
        .style('fill', 'transparent')
        .style('stroke', 'gray')
        .style('stroke-width', 15);

    var svgElementLinks = svgElement.append('g').attr('id', 'ls').selectAll('.link'), // links svg:graphics
        svgElementNodes = svgElement.append('g').selectAll('.node'), // nodes svg:graphics
        nodes = cluster.nodes(packageHierarchy(data)),
        links = packageImports(nodes);

    // d3.select(self.frameElement).style('height', diameter + 'px');
    drawNodes();
    update();

    return {
        add: function(a, b, status) {
            // console.log('[GRAPH] ADD: ' + a + ',' + b + ' :' + status);
            var n1 = nodeMap['node' + a],
                n2 = nodeMap['node' + b];
            var c = [n1, nodeMap[''], n2];
            c.source = n1;
            c.target = n2;
            c.status = status;
            links.push(c);
            update();
        },
        clear: function() {
            console.log('[GRAPH] CLEAR');
            links = [];
            update();
        },
        set: function(nodeId, value) {
            $('#node-id-' + nodeId).text(value);
        },
        get: function(nodeId) {
            return _Int(parseInt($('#node-id-' + nodeId).text()));
        }
    };

    function update() {
        // console.log('[GRAPH] update: ');
        $('#ls').empty();

        links = makeLinksUnique(links);
        svgElementLinks
            .data(bundle(links)) // https://github.com/mbostock/d3/wiki/Bundle-Layout#_bundle
            .enter().append('path')
            .each(function(d) {
                d.source = d[0];
                d.target = d[d.length - 1];
                d.both = false;
            })
            .attr('class', function(e, i) {
                return 'link link-' + (links[i].status ? 'ok' : 'fail');
            })
            .attr('d', lineDrawInstructions);
    }

    function drawNodes() {
        var r = 30,
            translation = function(d) {
                return 'rotate(' + (d.x - 90) + ')translate(' + (d.y + 8) + ',0)rotate(' + (-d.x + 90) + ')translate(' + (r * -1) + ',' + (r * -1) + ')';
            },
            onClick = function(d) {
                return 'model.nodeClicked(' + d.id + ')';
            };

        svgElementNodes = svgElementNodes
            .data(data)
            .enter();

        // background
        svgElementNodes.append('circle')
            .attr('class', 'node-bg')
            .attr('transform', translation)
            // .attr('width', nodeDim).attr('height', nodeDim)
            .attr('cx', r)
            .attr('cy', r)
            .attr('r', r)
            .attr('onclick', onClick);

        // text
        svgElementNodes.append('text')
            .attr('class', 'node-text')
            .attr('transform', translation)
            .attr('id', function(d) {
                return 'node-id-' + d.id;
            })
            .attr('x', r)
            .attr('y', r)
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return d.value;
            })
            .attr('onclick', onClick);
    }

    function createNodeData() {
        var data = [];
        for (var i = 0; i < nodeCount; i++) {
            data.push({
                'name': 'node' + i,
                'id': i,
                // 'imports': ['node' + ((i + 1) % nodeCount)] // next node
                'imports': [] // next node
            });
        }
        return data;
    }

    function packageHierarchy(classes) {
        classes.forEach(function(d) {
            nodeMap[d.name] = d;
            d.parent = nodeMap[''];
            d.parent.children.push(d);
        });

        return nodeMap[''];
    }

    function packageImports(nodes) {
        var imports = [];

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.imports) {
                d.imports.forEach(function(i) {
                    imports.push({
                        source: nodeMap[d.name],
                        target: nodeMap[i]
                    });
                });
            }
        });

        // list of {source:node1, target:node2}
        return imports;
    }

    function makeLinksUnique(links) {
        return _.reduce(links, function(p, c) {
            // args: pairs, connection
            var existingConnection = _.filter(p, function(d) {
                return d.source === c.target && d.target === c.source;
            });
            if (existingConnection.length === 1) {
                _.each(existingConnection, function(c2) {
                    c2.both = true;
                });
            } else {
                p.push(c);
            }

            return p;
        }, []);
    }
}

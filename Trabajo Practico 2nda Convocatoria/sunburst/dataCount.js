counts = {}

function countCategories(){
    data.forEach(element => {
        if(counts[element]){ counts[element] += 1}
        else{   counts[element] = 1}
    });
}

function buildHierarchy(counts) {
    var keys = Object.keys(counts)
    var root = {"name": "root", "children": []};
    keys.forEach(element =>  {
      var sequence = element;
      var size = counts[element];

      var parts = sequence.split("_");
      var currentNode = root;
      for (var j = 0; j < parts.length; j++) {
        var children = currentNode["children"];
        var nodeName = parts[j];
        var childNode;
        if (j + 1 < parts.length) {
     // Not yet at the end of the sequence; move down the tree.
       var foundChild = false;
       for (var k = 0; k < children.length; k++) {
         if (children[k]["name"] == nodeName) {
           childNode = children[k];
           foundChild = true;
           break;
         }
       }
    // If we don't already have a child node for this branch, create it.
       if (!foundChild) {
         childNode = {"name": nodeName, "children": []};
         children.push(childNode);
       }
       currentNode = childNode;
        } else {
       // Reached the end of the sequence; create a leaf node.
       childNode = {"name": nodeName, "size": size};
       children.push(childNode);
        }
      }
    })
    return root;
  };

  countCategories()
//Create the node with 2 pointers left and right and the data value
class Node {
    constructor(data){
        this.right = null;
        this.left = null;
        this.data = data;
    }
}

//Create the tree with the root set to Null
class BinaryTree {
    constructor(){
        this.root = null;
    }
    insert(data){
        const newNode = new Node(data);
        //check if the tree is empy
        if(this.root === null){
            //First node inserted as tree root
            this.root = newNode;
            console.log(`${data} inserted in the root!`);
        } else {
            this.insertNode(this.root,newNode);
        }
    }
    insertNode(node,newNode){
        if(node.data > newNode.data){
            if(node.left === null){
                node.left = newNode;
                console.log(`${newNode.data} inserted left! of ${node.data}`);
            } else {
                //This will run recursively until it find any left node set to null
                this.insertNode(node.left,newNode);
            }
        } else {
            if(node.right === null){
                node.right = newNode;
                console.log(`${newNode.data} inserted right! of ${node.data}`)
            } else {
                //This will run recursively until it find any right node set to null               
                this.insertNode(node.right,newNode);
            }
        }
    }
    showInOrder(node){
        if(this.root !== null){
            if(node.left !== null){
                this.showInOrder(node.left)
            }
            console.log(node.data);
            if(node.right !== null){
                this.showInOrder(node.right);
            }
        }
    }
}


const tree = new BinaryTree();
console.log(" ");
tree.insert(94);
tree.insert(22);
tree.insert(12);
tree.insert(96);
tree.insert(95);
tree.insert(14);
tree.insert(97);
tree.insert(23);
tree.insert(11);
console.log(" ");
//This is the tree format
//
//          94
//         /  \
//        22   96
//       / \   / \
//      12 23 96  97
//     / \    
//    11   14   
console.log("Show treee InOrder");
tree.showInOrder(tree.root);
//Show the tre inOrder
//11,12,14,22,23,(94),95,96,97
#include <iostream>
#include <queue>
#include <unordered_map>
#include <string>
#include <vector>

using namespace std;

// Structure for a node in the Huffman tree
struct HuffmanNode {
    string data;
    int frequency;
    HuffmanNode *left, *right;

    HuffmanNode(string data, int frequency) : data(data), frequency(frequency), left(nullptr), right(nullptr) {}
};

// Comparison function for priority queue
struct Compare {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->frequency > b->frequency;
    }
};

// Function to generate Huffman codes
void generateCodes(HuffmanNode* root, string code, unordered_map<string, string>& huffmanCodes) {
    if (root) {
        if (!root->left && !root->right) {
            huffmanCodes[root->data] = code;
        }
        generateCodes(root->left, code + "0", huffmanCodes);
        generateCodes(root->right, code + "1", huffmanCodes);
    }
}

int main() {
    // Sample IP addresses
    vector<string> ipAddresses = {"192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.5"};
    vector<int> frequencies = {5, 3, 2, 1, 1}; // Frequencies corresponding to each IP address

    // Priority queue to build Huffman tree
    priority_queue<HuffmanNode*, vector<HuffmanNode*>, Compare> minHeap;
    for (size_t i = 0; i < ipAddresses.size(); ++i) {
        minHeap.push(new HuffmanNode(ipAddresses[i], frequencies[i]));
    }

    // Build Huffman tree
    while (minHeap.size() > 1) {
        HuffmanNode* left = minHeap.top();
        minHeap.pop();
        HuffmanNode* right = minHeap.top();
        minHeap.pop();

        HuffmanNode* internalNode = new HuffmanNode("", left->frequency + right->frequency);
        internalNode->left = left;
        internalNode->right = right;

        minHeap.push(internalNode);
    }

    // Root of Huffman tree
    HuffmanNode* root = minHeap.top();

    // Generate Huffman codes
    unordered_map<string, string> huffmanCodes;
    generateCodes(root, "", huffmanCodes);

    // Output Huffman codes
    cout << "Huffman Codes for IP Addresses:\n";
    for (const auto& pair : huffmanCodes) {
        cout << pair.first << ": " << pair.second << "\n";
    }

    return 0;
}

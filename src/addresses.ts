const addresses: {[chainid: number]: NetworkConfig} = {
  5: {
    zoraActions: "0xc3656eE98ED1e6F99BAA21eE85E1349957C29e15",
    linearStrategy: "0xfd36c0b2f508e6afb4c1c66e16b45e2a61a73136",
    tokens: {
      DAI: "0x88271d333c72e51516b67f5567c728e702b3eee8"
    }
  }
};
type NetworkConfig = {
  zoraActions: string,
  linearStrategy: string,
  tokens: {
    DAI: string,
  }
};
export default addresses;

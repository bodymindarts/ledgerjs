import Btc from "@ledgerhq/hw-app-btc";

export default async transport => {
  const btc = new Btc(transport);

  // This transaction hex is complete and could be broadcast as is.
  // You can decode it to find the expected signature.
  const newTx = "01000000015667f9c73939f8b05c97f87ca31910ca5323195ab9061b07e10e802a5b91b1d200000000910047304402203e2dfedce4336d4df2ea9b3e7c66f6a24ccaa43a3fb555b1c078c65b2b10ddcf02205b2e90679158793e2c3ed6c79f22d227b7c07e4de3e07ff211da04005248c28201475121026666422d00f1b308fc7527198749f06fedb028b979c09f60d0348ef79c985e41210384257cf895f1ca492bbee5d7485ae0ef479036fdf59e15b92e37970a98d6fe7552aeffffffff0188130000000000001976a9140ae1441568d0d293764a347b191025c51556cecd88ac00000000"
  const bufferedData = btc.splitTransaction(newTx);
  const outputScript = btc
        .serializeTransactionOutputs(bufferedData)
        .toString("hex");

  var tx1 = btc.splitTransaction(
    "010000000164e1b240e8c1523545ad3cf593cbb6e67c73b7f0737cc40807efd605622b736d010000008a4730440220682e9974955b61a665a96533efe8c35dfbb4a7b559a965d21a9855e4daea2235022027705c34e034187311f7c83775df6602e9c4db33d63580b39f64bb9da89da0670141044289801366bcee6172b771cf5a7f13aaecd237a0b9a1ff9d769cabc2e6b70a34cec320a0565fb7caf11b1ca2f445f9b7b012dda5718b3cface369ee3a034ded6ffffffff02102700000000000017a9143530cab7ca6700a1d2d579adbf2697a72dfeb6d2878c9e8e65170100001976a9140ae1441568d0d293764a347b191025c51556cecd88ac00000000"
  );

  const result = await btc.signP2SHTransaction(
    [
      [
        tx1,
        0,
        "5121026666422d00f1b308fc7527198749f06fedb028b979c09f60d0348ef79c985e41210384257cf895f1ca492bbee5d7485ae0ef479036fdf59e15b92e37970a98d6fe7552ae",
      ]
    ],
    ["0'/0/0"],
    outputScript
  );

  const expectedSignature = "304402203e2dfedce4336d4df2ea9b3e7c66f6a24ccaa43a3fb555b1c078c65b2b10ddcf02205b2e90679158793e2c3ed6c79f22d227b7c07e4de3e07ff211da04005248c282"
  if (expectedSignature != result[0]) {
    console.log("signatures didn't match!");
    console.log("Expected: " + expectedSignature);
    console.log("Actual: " + result[0]);
    throw("BAD SIGNATURE");
  };
  return result;
};

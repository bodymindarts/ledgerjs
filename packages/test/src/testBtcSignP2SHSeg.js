import Btc from "@ledgerhq/hw-app-btc";

export default async transport => {
  const btc = new Btc(transport);

  // This transaction hex is complete and could be broadcast as is.
  // You can decode it to find the expected signature.
  const newTx = "01000000012776efd350c7557f652ef194d31c8a855cac19e478ec49d0e5e23ac9f5bc3626000000009200483045022100a82e92b5afc1765d91faafbd32b0918e7e54d1b2a58659438f2cd124f11316cf022066d81ae593d36a76ead4ebda98118e81a978ec5441ea732a62107ac3b21edb9601475121026666422d00f1b308fc7527198749f06fedb028b979c09f60d0348ef79c985e41210384257cf895f1ca492bbee5d7485ae0ef479036fdf59e15b92e37970a98d6fe7552aeffffffff0188130000000000001976a9140ae1441568d0d293764a347b191025c51556cecd88ac00000000"
  const bufferedData = btc.splitTransaction(newTx);
  const outputScript = btc
        .serializeTransactionOutputs(bufferedData)
        .toString("hex");

  var tx1 = btc.splitTransaction(
    "010000000132cff98f6f0e373028328355f7d20b6159b36992e8c0e2500157fc41e9fac98e010000008a473044022062dd099ebc4fb03d568732c55017d351cc9dffc0feb49ba30102441cef46e402022001508248e6337d8ab63b81d4ae3622f14bfc49a7e45dc8c615d24875e54d60900141044289801366bcee6172b771cf5a7f13aaecd237a0b9a1ff9d769cabc2e6b70a34cec320a0565fb7caf11b1ca2f445f9b7b012dda5718b3cface369ee3a034ded6ffffffff02102700000000000017a9143530cab7ca6700a1d2d579adbf2697a72dfeb6d28798af8f65170100001976a9140ae1441568d0d293764a347b191025c51556cecd88ac00000000"
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

  const expectedSignature = "3045022100a82e92b5afc1765d91faafbd32b0918e7e54d1b2a58659438f2cd124f11316cf022066d81ae593d36a76ead4ebda98118e81a978ec5441ea732a62107ac3b21edb96"
  if (expectedSignature != result[0]) {
    console.log("signatures didn't match!");
    console.log("Expected: " + expectedSignature);
    console.log("Actual: " + result[0]);
    throw("BAD SIGNATURE");
  };
  return result;
};

import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  MEMO_PROGRAM_ID,
  createPostResponse,
} from "@solana/actions";
import {
  Transaction,
  TransactionInstruction,
  PublicKey,
  ComputeBudgetProgram,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

export const GET = (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL("/pic.png", new URL(req.url).origin).toString(),
    label: "Send Memo",
    description: "Send a memo to a Solana address",
    title: "Memo Demo",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS, // 防止cors问题
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  // 获取账户
  let account: PublicKey;
  try {
    const body: ActionPostRequest = await req.json();
    account = new PublicKey(body.account);
  } catch (err) {
    return new Response("Invalid account", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  try {
    // 组装交易
    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple memo message", "utf-8"),
        keys: [],
      })
    );

    // 设置交易费用支付者
    transaction.feePayer = account;

    const connection = new Connection(clusterApiUrl("devnet")); // 使用测试rpc
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
      },
      // signers:[],
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    return Response.json("An error occurred", { status: 400 });
  }
};

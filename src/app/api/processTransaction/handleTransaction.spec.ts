import { handleTransaction } from "./handleTransaction";
import { parseTransaction } from "./parseTransaction";

jest.mock("./parseTransaction"); 
const mockParse = parseTransaction as jest.Mock;

describe("handleTransaction", () => {
  it("returns 200 and parsed result for valid transaction", async () => {
    const mockResult = { merchantId: "123", amount: 42 };
    mockParse.mockReturnValue(mockResult);

    const response = await handleTransaction({ transaction: "103JCB502QS316COSTSAVERGROCERY20564.80" });

    expect(response.status).toBe(200);
    expect(response.result).toEqual(mockResult);
  });

  it("returns 400 for missing or malformed transaction", async () => {
    mockParse.mockImplementation(() => {
      throw new Error("Missing required fields");
    });

    const response = await handleTransaction({ transaction: "INVALID_TRANSACTION" });

    expect(response.status).toBe(400);
    expect(response.result).toEqual({ error: expect.stringContaining("Server error:") });
  });

  it("returns 500 for unknown errors", async () => {
    mockParse.mockImplementation(() => {
      throw new Error("Something went wrong internally");
    });

    const response = await handleTransaction({ transaction: "UNKNOWN_ERROR" });

    expect(response.status).toBe(500);
    expect(response.result).toEqual({ error: expect.stringContaining("Server error:") });
  });
});

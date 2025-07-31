import { RealtimeAgent, tool, RealtimeItem } from '@openai/agents/realtime';

export const returnsAgent = new RealtimeAgent({
  name: 'Jane skiladeild',
  voice: 'sage',
  handoffDescription:
    'Customer Service Agent specialized in order lookups, policy checks, and return initiations.',

  instructions: `
# Persónuleiki og tónn
## Sjálfsmynd
Þú ert rólegur og hjálpsamur þjónustufulltrúi hjá Vertis sem sérhæfir sig í skilum og endurgreiðslum. Þú hefur mikla reynslu af því að aðstoða viðskiptavini með skil og veitir alltaf skýrar og hnitmiðaðar upplýsingar. Þú talar alltaf fullkomna íslensku með íslenskum hreim.

## Verkefni
Markmið þitt er að aðstoða viðskiptavini með skil á vörum, útskýra ferlið og ganga úr skugga um að þeir séu ánægðir með lausnina. Þú staðfestir allar upplýsingar og leiðbeinir notandanum í gegnum hvert skref.

## Framkoma
Þú ert kurteis, hlýlegur og lausnamiðaður. Þú hlustar vel á þarfir viðskiptavinarins og sýnir samkennd þegar vandamál koma upp.

## Tónn
Tónn þinn er faglegur, hlýr og hvetjandi. Þú sýnir alltaf þolinmæði og útskýrir allt á einfaldan hátt.

## Skref
1. Byrjaðu á að biðja um símanúmer notanda, leitaðu upp pöntunina og staðfestu vöruna áður en þú heldur áfram.
2. Spurðu hvers vegna notandinn vill skila vörunni.
3. Skoðaðu nýjustu reglur og athugaðu hvort hægt sé að skila vörunni.

## Kveðja
Þú kynnir þig sem þjónustufulltrúa í skiladeild Vertis og heitir Jane.
  - Dæmi: "Halló, þetta er Jane úr skiladeild Vertis."
Þú sýnir að þú hafir yfirsýn yfir samtalið og ástæðu fyrir yfirfærslu.
  - Dæmi: "Ég sé að þú vilt {skilgreina beiðni}, við skulum byrja á því."

## Skilaboð fyrir aðgerðaköll
Segðu alltaf notandanum hvað þú ætlar að gera áður en þú framkvæmir aðgerð, svo hann viti hvert skref.
  - Dæmi: "Allt í lagi, ég ætla að athuga pöntunarupplýsingarnar þínar núna."
  - Dæmi: "Leyfðu mér að skoða viðeigandi reglur."
Ef aðgerð tekur tíma, láttu notandann vita að þú sért enn að vinna í málinu.
  - Dæmi: "Ég þarf aðeins meiri tíma..."
Ekki láta notandann bíða lengi án samskipta, haltu áfram að veita stuttar uppfærslur eða kurteisislegar athugasemdir.
  - Dæmi: "Takk fyrir þolinmæðina, þetta tekur aðeins augnablik..."

# Upplýsingar
- Dagsins dagsetning er 26.12.2024
`,
  tools: [
    tool({
      name: 'lookupOrders',
      description:
        "Retrieve detailed order information by using the user's phone number, including shipping status and item details. Please be concise and only provide the minimum information needed to the user to remind them of relevant order details.",
      parameters: {
        type: 'object',
        properties: {
          phoneNumber: {
            type: 'string',
            description: "The user's phone number tied to their order(s).",
          },
        },
        required: ['phoneNumber'],
        additionalProperties: false,
      },
      execute: async (input: any) => {
        const { phoneNumber } = input as { phoneNumber: string };
        return {
          orders: [
            {
              order_id: 'SNP-20230914-001',
              order_date: '2024-09-14T09:30:00Z',
              delivered_date: '2024-09-16T14:00:00Z',
              order_status: 'delivered',
              subtotal_usd: 409.98,
              total_usd: 471.48,
              items: [
                {
                  item_id: 'SNB-TT-X01',
                  item_name: 'Twin Tip Snowboard X',
                  retail_price_usd: 249.99,
                },
                {
                  item_id: 'SNB-BOOT-ALM02',
                  item_name: 'All-Mountain Snowboard Boots',
                  retail_price_usd: 159.99,
                },
              ],
            },
            {
              order_id: 'SNP-20230820-002',
              order_date: '2023-08-20T10:15:00Z',
              delivered_date: null,
              order_status: 'in_transit',
              subtotal_usd: 339.97,
              total_usd: 390.97,
              items: [
                {
                  item_id: 'SNB-PKbk-012',
                  item_name: 'Park & Pipe Freestyle Board',
                  retail_price_usd: 189.99,
                },
                {
                  item_id: 'GOG-037',
                  item_name: 'Mirrored Snow Goggles',
                  retail_price_usd: 89.99,
                },
                {
                  item_id: 'SNB-BIND-CPRO',
                  item_name: 'Carving Pro Binding Set',
                  retail_price_usd: 59.99,
                },
              ],
            },
          ],
        };
      },
    }),
    tool({
      name: 'retrievePolicy',
      description:
        "Retrieve and present the store’s policies, including eligibility for returns. Do not describe the policies directly to the user, only reference them indirectly to potentially gather more useful information from the user.",
      parameters: {
        type: 'object',
        properties: {
          region: {
            type: 'string',
            description: 'The region where the user is located.',
          },
          itemCategory: {
            type: 'string',
            description: 'The category of the item the user wants to return (e.g., shoes, accessories).',
          },
        },
        required: ['region', 'itemCategory'],
        additionalProperties: false,
      },
      execute: async (input: any) => {
        return {
          policy: `
At Snowy Peak Boards, we believe in transparent and customer-friendly policies to ensure you have a hassle-free experience. Below are our detailed guidelines:

1. GENERAL RETURN POLICY
• Return Window: We offer a 30-day return window starting from the date your order was delivered. 
• Eligibility: Items must be unused, in their original packaging, and have tags attached to qualify for refund or exchange. 
• Non-Refundable Shipping: Unless the error originated from our end, shipping costs are typically non-refundable.

2. CONDITION REQUIREMENTS
• Product Integrity: Any returned product showing signs of use, wear, or damage may be subject to restocking fees or partial refunds. 
• Promotional Items: If you received free or discounted promotional items, the value of those items might be deducted from your total refund if they are not returned in acceptable condition.
• Ongoing Evaluation: We reserve the right to deny returns if a pattern of frequent or excessive returns is observed.

3. DEFECTIVE ITEMS
• Defective items are eligible for a full refund or exchange within 1 year of purchase, provided the defect is outside normal wear and tear and occurred under normal use. 
• The defect must be described in sufficient detail by the customer, including how it was outside of normal use. Verbal description of what happened is sufficient, photos are not necessary.
• The agent can use their discretion to determine whether it’s a true defect warranting reimbursement or normal use.
## Examples
- "It's defective, there's a big crack": MORE INFORMATION NEEDED
- "The snowboard has delaminated and the edge came off during normal use, after only about three runs. I can no longer use it and it's a safety hazard.": ACCEPT RETURN

4. REFUND PROCESSING
• Inspection Timeline: Once your items reach our warehouse, our Quality Control team conducts a thorough inspection which can take up to 5 business days. 
• Refund Method: Approved refunds will generally be issued via the original payment method. In some cases, we may offer store credit or gift cards. 
• Partial Refunds: If products are returned in a visibly used or incomplete condition, we may process only a partial refund.

5. EXCHANGE POLICY
• In-Stock Exchange: If you wish to exchange an item, we suggest confirming availability of the new item before initiating a return. 
• Separate Transactions: In some cases, especially for limited-stock items, exchanges may be processed as a separate transaction followed by a standard return procedure.

6. ADDITIONAL CLAUSES
• Extended Window: Returns beyond the 30-day window may be eligible for store credit at our discretion, but only if items remain in largely original, resalable condition. 
• Communication: For any clarifications, please reach out to our customer support team to ensure your questions are answered before shipping items back.

We hope these policies give you confidence in our commitment to quality and customer satisfaction. Thank you for choosing Snowy Peak Boards!
`,
        };
      },
    }),
    tool({
      name: 'checkEligibilityAndPossiblyInitiateReturn',
      description: `Check the eligibility of a proposed action for a given order, providing approval or denial with reasons. This will send the request to an experienced agent that's highly skilled at determining order eligibility, who may agree and initiate the return.

# Details
- Note that this agent has access to the full conversation history, so you only need to provide high-level details.
- ALWAYS check retrievePolicy first to ensure we have relevant context.
- Note that this can take up to 10 seconds, so please provide small updates to the user every few seconds, like 'I just need a little more time'
- Feel free to share an initial assessment of potential eligibility with the user before calling this function.
`,
      parameters: {
        type: 'object',
        properties: {
          userDesiredAction: {
            type: 'string',
            description: "The proposed action the user wishes to be taken.",
          },
          question: {
            type: 'string',
            description: "The question you'd like help with from the skilled escalation agent.",
          },
        },
        required: ['userDesiredAction', 'question'],
        additionalProperties: false,
      },
      execute: async (input: any, details) => {
        const { userDesiredAction, question } = input as {
          userDesiredAction: string;
          question: string;
        };
        const nMostRecentLogs = 10;
        const history: RealtimeItem[] = (details?.context as any)?.history ?? [];
        const filteredLogs = history.filter((log) => log.type === 'message');
        const messages = [
          {
            role: "system",
            content:
              "You are an an expert at assessing the potential eligibility of cases based on how well the case adheres to the provided guidelines. You always adhere very closely to the guidelines and do things 'by the book'.",
          },
          {
            role: "user",
            content: `Carefully consider the context provided, which includes the request and relevant policies and facts, and determine whether the user's desired action can be completed according to the policies. Provide a concise explanation or justification. Please also consider edge cases and other information that, if provided, could change the verdict, for example if an item is defective but the user hasn't stated so. Again, if ANY CRITICAL INFORMATION IS UNKNOWN FROM THE USER, ASK FOR IT VIA "Additional Information Needed" RATHER THAN DENYING THE CLAIM.

<modelContext>
userDesiredAction: ${userDesiredAction}
question: ${question}
</modelContext>

<conversationContext>
${JSON.stringify(filteredLogs.slice(-nMostRecentLogs), null, 2)}
</conversationContext>

<output_format>
# Rationale
// Short description explaining the decision

# User Request
// The user's desired outcome or action

# Is Eligible
true/false/need_more_information
// "true" if you're confident that it's true given the provided context, and no additional info is needex
// "need_more_information" if you need ANY additional information to make a clear determination.

# Additional Information Needed
// Other information you'd need to make a clear determination. Can be "None"

# Return Next Steps
// Explain to the user that the user will get a text message with next steps. Only if is_eligible=true, otherwise "None". Provide confirmation to the user the item number, the order number, and the phone number they'll receive the text message at.
</output_format>  
`,
          },
        ];
        const model = "o4-mini";
        console.log(`checking order eligibility with model=${model}`);

        const response = await fetch("/api/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model, input: messages }),
        });

        if (!response.ok) {
          console.warn("Server returned an error:", response);
          return { error: "Something went wrong." };
        }

        const { output = [] } = await response.json();
        const text = output
          .find((i: any) => i.type === 'message' && i.role === 'assistant')
          ?.content?.find((c: any) => c.type === 'output_text')?.text ?? '';

        console.log(text || output);
        return { result: text || output };
      },
    }),
  ],

  handoffs: [],
});

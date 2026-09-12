import { handleAssistantMessage } from '../server/services/assistantService.js';

async function main() {
  console.log('Testing Karigar Saathi assistant...');
  const res1 = await handleAssistantMessage({ message: 'Kitne artisans aur products hain मंच par?', language: 'hi' });
  console.log('\n[Q: Kitne artisans...]\nResponse:', res1.response, '\nIntent:', res1.intent);

  const res2 = await handleAssistantMessage({ message: 'Show me the SIH presentation scenarios', language: 'en' });
  console.log('\n[Q: SIH scenarios]\nResponse:', res2.response, '\nIntent:', res2.intent);

  const res3 = await handleAssistantMessage({ message: 'mera profit kitna hai', language: 'hi' });
  console.log('\n[Q: mera profit kitna hai]\nResponse:', res3.response);
}

main().catch(console.error);

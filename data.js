const envelopes = [
    {
      id: 1,
      category: 'Groceries',
      totalAmount: 400,
      spendingLimit: 350
    },
    {
      id: 2,
      category: 'Rent',
      totalAmount: 100,
      spendingLimit: 90
    },
    {
      id: 3,
      category: 'Health',
      totalAmount: 150,
      spendingLimit: 100
    },
    {
      id: 4,
      category: 'Investment',
      totalAmount: 200,
      spendingLimit: 150,
    },
    {
      id: 5,
      category: 'Clothing',
      totalAmount: 200,
      spendingLimit: 150,
    }
  ];
  
  let totalBudget = 2000;
  
  module.exports = { envelopes, totalBudget};
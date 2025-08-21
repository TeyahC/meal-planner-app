const recipes = [
  {
    id: 1,
    name: "Classic Pancakes",
    category: "breakfast",
    ingredients: [
      { name: "flour", quantity: 200, unit: "g" },
      { name: "milk", quantity: 300, unit: "ml" },
      { name: "baking powder", quantity: 1, unit: "tsp" },
      { name: "sugar", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "vegetable oil", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Mix flour, baking powder, sugar, and salt in a bowl.\n" +
      "2. Whisk milk and oil in another bowl.\n" +
      "3. Combine wet and dry ingredients until smooth.\n" +
      "4. Heat a non-stick pan, pour batter, cook until bubbles form, flip and cook other side.\n" +
      "5. Serve with syrup or fruit."
  },
  {
    id: 2,
    name: "Avocado Toast",
    category: "breakfast",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices" },
      { name: "avocado", quantity: 1, unit: "whole" },
      { name: "lemon", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.1, unit: "tsp" }
    ],
    allergies: ["gluten"],
    instructions:
      "1. Toast the bread slices.\n" +
      "2. Mash the avocado with lemon juice, salt, and pepper.\n" +
      "3. Spread the avocado mash on the toast.\n" +
      "4. Optionally, top with chili flakes or a drizzle of olive oil."
  },
  {
    id: 3,
    name: "Chicken Caesar Salad",
    category: "lunch",
    ingredients: [
      { name: "chicken breast", quantity: 300, unit: "g" },
      { name: "romaine lettuce", quantity: 1, unit: "head" },
      { name: "croutons", quantity: 0.5, unit: "cup" },
      { name: "parmesan cheese", quantity: 50, unit: "g grated" },
      { name: "caesar dressing", quantity: 3, unit: "tbsp" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "black pepper", quantity: 0.1, unit: "tsp" }
    ],
    allergies: ["milk", "gluten", "egg"],
    instructions:
      "1. Season chicken breast with salt and pepper.\n" +
      "2. Heat olive oil in a pan and cook chicken for 6-7 minutes each side until golden.\n" +
      "3. Let chicken rest for 5 minutes, then slice thinly.\n" +
      "4. Wash and chop romaine lettuce, place in a large bowl.\n" +
      "5. Add croutons and grated parmesan cheese.\n" +
      "6. Toss with Caesar dressing and top with sliced chicken.\n" +
      "7. Serve immediately with extra parmesan if desired."
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    category: "lunch",
    ingredients: [
      { name: "broccoli", quantity: 1, unit: "cup" },
      { name: "carrots", quantity: 1, unit: "cup" },
      { name: "peppers", quantity: 1, unit: "cup" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "ginger", quantity: 1, unit: "inch" },
      { name: "vegetable oil", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["soy"],
    instructions:
      "1. Heat oil in a wok or pan.\n" +
      "2. Add minced garlic and ginger, sauté for 1 minute.\n" +
      "3. Add chopped vegetables, stir fry for 5-7 minutes until tender-crisp.\n" +
      "4. Add soy sauce and cook for another 2 minutes.\n" +
      "5. Serve with rice or noodles."
  },
  {
    id: 5,
    name: "Spaghetti Bolognese",
    category: "dinner",
    ingredients: [
      { name: "spaghetti", quantity: 200, unit: "g" },
      { name: "ground beef", quantity: 300, unit: "g" },
      { name: "crushed tomatoes", quantity: 400, unit: "ml" },
      { name: "onion", quantity: 1, unit: "medium diced" },
      { name: "garlic", quantity: 3, unit: "cloves minced" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "carrot", quantity: 1, unit: "medium diced" },
      { name: "celery", quantity: 1, unit: "stalk diced" },
      { name: "red wine", quantity: 0.5, unit: "cup" },
      { name: "bay leaves", quantity: 2, unit: "pieces" },
      { name: "oregano", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "black pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten", "alcohol"],
    instructions:
      "1. Cook spaghetti in salted boiling water according to package instructions.\n" +
      "2. Heat olive oil in a large pan over medium heat.\n" +
      "3. Sauté diced onion, carrot, and celery for 5 minutes until soft.\n" +
      "4. Add minced garlic and cook for 1 minute until fragrant.\n" +
      "5. Add ground beef, breaking it up with a spoon, cook until browned.\n" +
      "6. Pour in red wine and let it reduce for 2 minutes.\n" +
      "7. Add crushed tomatoes, bay leaves, oregano, salt, and pepper.\n" +
      "8. Simmer on low heat for 20-25 minutes, stirring occasionally.\n" +
      "9. Remove bay leaves and serve sauce over cooked spaghetti."
  },
  {
    id: 6,
    name: "Grilled Salmon with Asparagus",
    category: "dinner",
    ingredients: [
      { name: "salmon fillet", quantity: 1, unit: "piece" },
      { name: "asparagus", quantity: 8, unit: "spears" },
      { name: "lemon", quantity: 0.5, unit: "whole" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.1, unit: "tsp" }
    ],
    allergies: ["fish"],
    instructions:
      "1. Preheat grill to medium-high.\n" +
      "2. Toss asparagus in olive oil, salt, and pepper.\n" +
      "3. Grill salmon and asparagus for 5-7 minutes each side.\n" +
      "4. Squeeze lemon over before serving."
  },
  {
    id: 7,
    name: "Beef Tacos",
    category: "dinner",
    ingredients: [
      { name: "ground beef", quantity: 300, unit: "g" },
      { name: "taco shells", quantity: 6, unit: "pieces" },
      { name: "lettuce", quantity: 1, unit: "cup shredded" },
      { name: "tomato", quantity: 1, unit: "medium" },
      { name: "cheddar cheese", quantity: 0.5, unit: "cup shredded" },
      { name: "sour cream", quantity: 0.25, unit: "cup" },
      { name: "taco seasoning", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["milk", "gluten"],
    instructions:
      "1. Cook ground beef with taco seasoning until browned.\n" +
      "2. Warm taco shells in oven.\n" +
      "3. Fill shells with beef, shredded lettuce, diced tomato, cheese, and sour cream.\n" +
      "4. Serve immediately."
  },
  {
    id: 8,
    name: "Chocolate Chip Cookies",
    category: "dessert",
    ingredients: [
      { name: "flour", quantity: 250, unit: "g" },
      { name: "butter", quantity: 150, unit: "g" },
      { name: "sugar", quantity: 150, unit: "g" },
      { name: "brown sugar", quantity: 150, unit: "g" },
      { name: "egg", quantity: 1, unit: "whole" },
      { name: "vanilla extract", quantity: 1, unit: "tsp" },
      { name: "chocolate chips", quantity: 200, unit: "g" },
      { name: "baking soda", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten", "milk", "egg"],
    instructions:
      "1. Preheat oven to 175°C (350°F).\n" +
      "2. Cream butter, sugar, and brown sugar until fluffy.\n" +
      "3. Add egg and vanilla, mix well.\n" +
      "4. Combine flour, baking soda, and salt, then add to wet mixture.\n" +
      "5. Stir in chocolate chips.\n" +
      "6. Drop spoonfuls onto baking sheet and bake for 10-12 minutes."
  },
  {
    id: 9,
    name: "Fruit Salad",
    category: "snack",
    ingredients: [
      { name: "strawberries", quantity: 1, unit: "cup" },
      { name: "blueberries", quantity: 1, unit: "cup" },
      { name: "kiwi", quantity: 2, unit: "whole" },
      { name: "orange", quantity: 1, unit: "whole" },
      { name: "grapes", quantity: 1, unit: "cup" },
      { name: "honey", quantity: 2, unit: "tbsp" },
      { name: "lemon juice", quantity: 1, unit: "tbsp" }
    ],
    allergies: [],
    instructions:
      "1. Chop all fruit into bite-sized pieces.\n" +
      "2. Mix honey and lemon juice in a small bowl.\n" +
      "3. Toss fruit with honey-lemon dressing.\n" +
      "4. Chill before serving."
  },
  {
    id: 10,
    name: "Hummus and Veggie Sticks",
    category: "snack",
    ingredients: [
      { name: "chickpeas", quantity: 400, unit: "g canned" },
      { name: "tahini", quantity: 2, unit: "tbsp" },
      { name: "lemon juice", quantity: 3, unit: "tbsp fresh" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "cumin", quantity: 0.5, unit: "tsp" },
      { name: "paprika", quantity: 0.25, unit: "tsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "water", quantity: 2, unit: "tbsp" },
      { name: "carrot", quantity: 2, unit: "medium" },
      { name: "celery", quantity: 3, unit: "stalks" },
      { name: "cucumber", quantity: 1, unit: "large" },
      { name: "bell pepper", quantity: 1, unit: "medium" }
    ],
    allergies: ["sesame"],
    instructions:
      "1. Drain and rinse chickpeas, reserving some liquid.\n" +
      "2. In a food processor, blend garlic until minced.\n" +
      "3. Add chickpeas, tahini, lemon juice, cumin, paprika, and salt.\n" +
      "4. Blend until smooth, adding water or chickpea liquid as needed.\n" +
      "5. Taste and adjust seasoning with more lemon, salt, or cumin.\n" +
      "6. Transfer to serving bowl and drizzle with olive oil.\n" +
      "7. Cut vegetables into sticks and serve alongside hummus."
  },
  {
    id: 11,
    name: "French Toast",
    category: "breakfast",
    ingredients: [
      { name: "bread", quantity: 4, unit: "slices" },
      { name: "egg", quantity: 2, unit: "whole" },
      { name: "milk", quantity: 100, unit: "ml" },
      { name: "cinnamon", quantity: 1, unit: "tsp" },
      { name: "vanilla extract", quantity: 1, unit: "tsp" },
      { name: "butter", quantity: 2, unit: "tbsp" },
      { name: "maple syrup", quantity: 4, unit: "tbsp" }
    ],
    allergies: ["gluten", "egg", "milk"],
    instructions:
      "1. Whisk egg, milk, cinnamon, and vanilla in a bowl.\n" +
      "2. Dip bread slices in mixture until soaked.\n" +
      "3. Cook in buttered pan until golden brown on both sides.\n" +
      "4. Serve with maple syrup."
  },
  {
    id: 12,
    name: "Quinoa Salad",
    category: "lunch",
    ingredients: [
      { name: "quinoa", quantity: 150, unit: "g" },
      { name: "cucumber", quantity: 1, unit: "medium" },
      { name: "tomato", quantity: 2, unit: "medium" },
      { name: "red onion", quantity: 0.5, unit: "medium" },
      { name: "feta cheese", quantity: 100, unit: "g" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "lemon juice", quantity: 2, unit: "tbsp" },
      { name: "mint", quantity: 0.25, unit: "cup chopped" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Cook quinoa according to package instructions, cool.\n" +
      "2. Chop cucumber, tomato, red onion, and mint.\n" +
      "3. Mix quinoa with veggies, feta, olive oil, and lemon juice.\n" +
      "4. Chill before serving."
  },
  {
    id: 13,
    name: "Vegetable Curry",
    category: "dinner",
    ingredients: [
      { name: "potato", quantity: 300, unit: "g cubed" },
      { name: "carrot", quantity: 200, unit: "g sliced" },
      { name: "green peas", quantity: 150, unit: "g" },
      { name: "coconut milk", quantity: 400, unit: "ml" },
      { name: "curry powder", quantity: 2, unit: "tbsp" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "garlic", quantity: 3, unit: "cloves minced" },
      { name: "ginger", quantity: 2, unit: "cm fresh grated" },
      { name: "vegetable oil", quantity: 2, unit: "tbsp" },
      { name: "tomato", quantity: 1, unit: "medium diced" },
      { name: "vegetable stock", quantity: 200, unit: "ml" },
      { name: "turmeric", quantity: 0.5, unit: "tsp" },
      { name: "salt", quantity: 0.75, unit: "tsp" },
      { name: "cilantro", quantity: 0.25, unit: "cup chopped" }
    ],
    allergies: [],
    instructions:
      "1. Heat oil in a large pot over medium heat.\n" +
      "2. Sauté diced onion for 5 minutes until translucent.\n" +
      "3. Add minced garlic and grated ginger, cook 1 minute.\n" +
      "4. Add curry powder and turmeric, cook 30 seconds until fragrant.\n" +
      "5. Add cubed potatoes and sliced carrots, stir to coat with spices.\n" +
      "6. Add diced tomato and cook 3 minutes until soft.\n" +
      "7. Pour in coconut milk and vegetable stock, bring to a boil.\n" +
      "8. Reduce heat and simmer 15-20 minutes until vegetables are tender.\n" +
      "9. Add peas in the last 5 minutes of cooking.\n" +
      "10. Season with salt and garnish with fresh cilantro.\n" +
      "11. Serve hot with basmati rice or naan bread."
  },
  {
    id: 14,
    name: "Tomato Soup",
    category: "lunch",
    ingredients: [
      { name: "tomatoes", quantity: 800, unit: "g" },
      { name: "onion", quantity: 1, unit: "medium" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "vegetable stock", quantity: 500, unit: "ml" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Heat oil in pot, sauté chopped onion and garlic.\n" +
      "2. Add chopped tomatoes and cook for 10 minutes.\n" +
      "3. Add vegetable stock, simmer 15 minutes.\n" +
      "4. Blend until smooth, season with salt and pepper.\n" +
      "5. Serve warm."
  },
  {
    id: 15,
    name: "Omelette",
    category: "breakfast",
    ingredients: [
      { name: "eggs", quantity: 3, unit: "whole" },
      { name: "milk", quantity: 30, unit: "ml" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.1, unit: "tsp" },
      { name: "butter", quantity: 1, unit: "tbsp" },
      { name: "cheese", quantity: 50, unit: "g" }
    ],
    allergies: ["egg", "milk"],
    instructions:
      "1. Beat eggs with milk, salt, and pepper.\n" +
      "2. Heat butter in pan.\n" +
      "3. Pour egg mixture, cook until edges set.\n" +
      "4. Add cheese on one half, fold omelette.\n" +
      "5. Cook until cheese melts.\n" +
      "6. Serve hot."
  },
  {
    id: 16,
    name: "Turkey Sandwich",
    category: "lunch",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices" },
      { name: "turkey slices", quantity: 100, unit: "g" },
      { name: "lettuce", quantity: 2, unit: "leaves" },
      { name: "tomato", quantity: 2, unit: "slices" },
      { name: "mayonnaise", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["gluten", "egg"],
    instructions:
      "1. Toast bread slices.\n" +
      "2. Spread mayonnaise on bread.\n" +
      "3. Layer turkey slices, lettuce, and tomato.\n" +
      "4. Assemble sandwich and cut in half."
  },
  {
    id: 17,
    name: "Roast Chicken with Vegetables",
    category: "dinner",
    ingredients: [
      { name: "whole chicken", quantity: 1.5, unit: "kg" },
      { name: "potatoes", quantity: 600, unit: "g quartered" },
      { name: "carrots", quantity: 400, unit: "g chunked" },
      { name: "onion", quantity: 2, unit: "medium quartered" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "fresh rosemary", quantity: 3, unit: "sprigs" },
      { name: "fresh thyme", quantity: 2, unit: "sprigs" },
      { name: "garlic", quantity: 4, unit: "cloves" },
      { name: "lemon", quantity: 1, unit: "whole" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" },
      { name: "butter", quantity: 2, unit: "tbsp softened" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Preheat oven to 200°C (400°F).\n" +
      "2. Pat chicken dry and season inside and out with salt and pepper.\n" +
      "3. Stuff cavity with lemon halves, garlic cloves, and herb sprigs.\n" +
      "4. Rub softened butter under and over the skin.\n" +
      "5. Place vegetables in roasting pan and drizzle with olive oil.\n" +
      "6. Season vegetables with salt, pepper, and remaining herbs.\n" +
      "7. Place chicken on top of vegetables, breast side up.\n" +
      "8. Roast for 1.5-1.75 hours until internal temp reaches 74°C (165°F).\n" +
      "9. Baste chicken and vegetables every 30 minutes.\n" +
      "10. Let chicken rest for 10 minutes before carving.\n" +
      "11. Serve with the roasted vegetables and pan juices."
  },
  {
    id: 18,
    name: "Chocolate Mousse",
    category: "dessert",
    ingredients: [
      { name: "dark chocolate", quantity: 200, unit: "g" },
      { name: "egg", quantity: 3, unit: "whole" },
      { name: "sugar", quantity: 50, unit: "g" },
      { name: "cream", quantity: 200, unit: "ml" }
    ],
    allergies: ["egg", "milk"],
    instructions:
      "1. Melt chocolate over a double boiler.\n" +
      "2. Whisk egg whites until stiff peaks form.\n" +
      "3. Whip cream until soft peaks.\n" +
      "4. Fold egg whites and cream into melted chocolate gently.\n" +
      "5. Chill for at least 2 hours before serving."
  },
  {
    id: 19,
    name: "Veggie Wrap",
    category: "snack",
    ingredients: [
      { name: "tortilla wrap", quantity: 1, unit: "piece" },
      { name: "hummus", quantity: 3, unit: "tbsp" },
      { name: "lettuce", quantity: 2, unit: "leaves" },
      { name: "tomato", quantity: 3, unit: "slices" },
      { name: "cucumber", quantity: 5, unit: "slices" },
      { name: "carrot", quantity: 0.5, unit: "cup grated" }
    ],
    allergies: ["gluten", "sesame"],
    instructions:
      "1. Spread hummus over tortilla wrap.\n" +
      "2. Layer with lettuce, tomato, cucumber, and grated carrot.\n" +
      "3. Roll tightly and slice in half."
  },
  {
    id: 20,
    name: "Caprese Salad",
    category: "lunch",
    ingredients: [
      { name: "tomato", quantity: 2, unit: "medium" },
      { name: "mozzarella", quantity: 150, unit: "g" },
      { name: "basil", quantity: 10, unit: "leaves" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "balsamic vinegar", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.1, unit: "tsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Slice tomato and mozzarella.\n" +
      "2. Arrange on a plate alternating slices.\n" +
      "3. Top with basil leaves.\n" +
      "4. Drizzle olive oil and balsamic vinegar.\n" +
      "5. Season with salt and pepper."
  },
  {
    id: 21,
    name: "Peanut Butter Banana Toast",
    category: "breakfast",
    ingredients: [
      { name: "bread", quantity: 1, unit: "slice" },
      { name: "peanut butter", quantity: 2, unit: "tbsp" },
      { name: "banana", quantity: 0.5, unit: "whole" }
    ],
    allergies: ["gluten", "peanut"],
    instructions:
      "1. Toast the bread.\n" +
      "2. Spread peanut butter on top.\n" +
      "3. Slice banana and place over the toast."
  },
  {
    id: 22,
    name: "Greek Salad",
    category: "lunch",
    ingredients: [
      { name: "cucumber", quantity: 1, unit: "medium" },
      { name: "tomato", quantity: 2, unit: "medium" },
      { name: "red onion", quantity: 0.5, unit: "medium" },
      { name: "feta", quantity: 100, unit: "g" },
      { name: "olives", quantity: 0.5, unit: "cup" },
      { name: "olive oil", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Chop cucumber, tomato, and onion.\n" +
      "2. Mix in a bowl with feta and olives.\n" +
      "3. Drizzle with olive oil."
  },
  {
    id: 23,
    name: "Tuna Pasta Salad",
    category: "lunch",
    ingredients: [
      { name: "pasta", quantity: 150, unit: "g" },
      { name: "tuna", quantity: 150, unit: "g" },
      { name: "sweetcorn", quantity: 0.5, unit: "cup" },
      { name: "mayonnaise", quantity: 3, unit: "tbsp" }
    ],
    allergies: ["gluten", "egg", "fish"],
    instructions:
      "1. Boil pasta and let cool.\n" +
      "2. Mix with drained tuna and sweetcorn.\n" +
      "3. Stir in mayonnaise."
  },
  {
    id: 24,
    name: "Hearty Vegetable Soup",
    category: "dinner",
    ingredients: [
      { name: "carrots", quantity: 300, unit: "g diced" },
      { name: "celery", quantity: 200, unit: "g diced" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "tomatoes", quantity: 400, unit: "g diced" },
      { name: "garlic", quantity: 3, unit: "cloves minced" },
      { name: "vegetable broth", quantity: 1.5, unit: "liter" },
      { name: "potatoes", quantity: 300, unit: "g cubed" },
      { name: "green beans", quantity: 150, unit: "g trimmed" },
      { name: "corn kernels", quantity: 100, unit: "g" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "bay leaves", quantity: 2, unit: "pieces" },
      { name: "dried thyme", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" },
      { name: "fresh parsley", quantity: 0.25, unit: "cup chopped" }
    ],
    allergies: [],
    instructions:
      "1. Heat olive oil in a large pot over medium heat.\n" +
      "2. Sauté diced onion, carrots, and celery for 8-10 minutes until softened.\n" +
      "3. Add minced garlic and cook for 1 minute until fragrant.\n" +
      "4. Add diced tomatoes, thyme, and bay leaves, cook 5 minutes.\n" +
      "5. Pour in vegetable broth and bring to a boil.\n" +
      "6. Add cubed potatoes and simmer 15 minutes.\n" +
      "7. Add green beans and corn, continue cooking 10 minutes.\n" +
      "8. Season with salt and pepper to taste.\n" +
      "9. Remove bay leaves and stir in fresh parsley.\n" +
      "10. Serve hot with crusty bread or crackers."
  },
  {
    id: 25,
    name: "Berry Parfait",
    category: "dessert",
    ingredients: [
      { name: "yogurt", quantity: 200, unit: "g" },
      { name: "berries", quantity: 1, unit: "cup" },
      { name: "granola", quantity: 0.5, unit: "cup" }
    ],
    allergies: ["milk", "gluten"],
    instructions:
      "1. Layer yogurt, berries, and granola in a glass.\n" +
      "2. Repeat layers and serve chilled."
  },
  {
    id: 26,
    name: "Cheese and Crackers",
    category: "snack",
    ingredients: [
      { name: "cheddar", quantity: 100, unit: "g" },
      { name: "crackers", quantity: 6, unit: "pieces" }
    ],
    allergies: ["milk", "gluten"],
    instructions:
      "1. Slice cheese.\n" +
      "2. Arrange on crackers."
  },
  {
    id: 27,
    name: "Apple Slices with Cinnamon",
    category: "snack",
    ingredients: [
      { name: "apple", quantity: 1, unit: "medium" },
      { name: "cinnamon", quantity: 0.5, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Slice apple thinly.\n" +
      "2. Sprinkle with cinnamon."
  },
  {
    id: 28,
    name: "Chickpea Curry",
    category: "dinner",
    ingredients: [
      { name: "chickpeas", quantity: 800, unit: "g canned" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "garlic", quantity: 4, unit: "cloves minced" },
      { name: "ginger", quantity: 3, unit: "cm fresh grated" },
      { name: "coconut milk", quantity: 400, unit: "ml" },
      { name: "diced tomatoes", quantity: 400, unit: "g canned" },
      { name: "curry powder", quantity: 2, unit: "tbsp" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "turmeric", quantity: 0.5, unit: "tsp" },
      { name: "paprika", quantity: 1, unit: "tsp" },
      { name: "vegetable oil", quantity: 2, unit: "tbsp" },
      { name: "vegetable stock", quantity: 200, unit: "ml" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "cayenne pepper", quantity: 0.25, unit: "tsp" },
      { name: "fresh cilantro", quantity: 0.5, unit: "cup chopped" }
    ],
    allergies: [],
    instructions:
      "1. Heat oil in a large pan over medium heat.\n" +
      "2. Sauté diced onion for 5-6 minutes until golden.\n" +
      "3. Add minced garlic and grated ginger, cook 1 minute.\n" +
      "4. Add all spices (curry powder, cumin, turmeric, paprika, cayenne).\n" +
      "5. Cook spices for 1 minute until fragrant.\n" +
      "6. Add diced tomatoes and cook 5 minutes until they break down.\n" +
      "7. Add drained chickpeas and stir to coat with spice mixture.\n" +
      "8. Pour in coconut milk and vegetable stock.\n" +
      "9. Simmer for 15-20 minutes until sauce thickens.\n" +
      "10. Season with salt and adjust spices to taste.\n" +
      "11. Garnish with fresh cilantro and serve with rice or naan."
  },
  {
    id: 29,
    name: "Grilled Cheese Sandwich",
    category: "lunch",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices" },
      { name: "cheddar", quantity: 100, unit: "g" },
      { name: "butter", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Butter bread slices.\n" +
      "2. Place cheese between slices.\n" +
      "3. Grill until golden brown."
  },
  {
    id: 30,
    name: "Mango Lassi",
    category: "snack",
    ingredients: [
      { name: "mango", quantity: 1, unit: "whole" },
      { name: "yogurt", quantity: 150, unit: "g" },
      { name: "milk", quantity: 100, unit: "ml" },
      { name: "honey", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Blend mango, yogurt, milk, and honey.\n" +
      "2. Serve cold."
  },
  {
    id: 31,
    name: "Egg Fried Rice",
    category: "dinner",
    ingredients: [
      { name: "rice", quantity: 200, unit: "g" },
      { name: "egg", quantity: 2, unit: "whole" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "green onion", quantity: 2, unit: "stalks" }
    ],
    allergies: ["egg", "soy"],
    instructions:
      "1. Scramble eggs and set aside.\n" +
      "2. Stir-fry cooked rice.\n" +
      "3. Add soy sauce and green onion.\n" +
      "4. Mix in scrambled egg."
  },
  {
    id: 32,
    name: "Tomato Bruschetta",
    category: "snack",
    ingredients: [
      { name: "baguette", quantity: 1, unit: "loaf" },
      { name: "tomato", quantity: 3, unit: "medium" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "basil", quantity: 10, unit: "leaves" },
      { name: "olive oil", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["gluten"],
    instructions:
      "1. Toast baguette slices.\n" +
      "2. Top with chopped tomato, garlic, basil, and olive oil."
  },
  {
    id: 33,
    name: "Stuffed Bell Peppers",
    category: "dinner",
    ingredients: [
      { name: "bell pepper", quantity: 3, unit: "medium" },
      { name: "rice", quantity: 150, unit: "g" },
      { name: "ground beef", quantity: 300, unit: "g" },
      { name: "onion", quantity: 1, unit: "medium" },
      { name: "tomato sauce", quantity: 200, unit: "ml" }
    ],
    allergies: [],
    instructions:
      "1. Cook rice and beef with onion.\n" +
      "2. Mix in tomato sauce.\n" +
      "3. Stuff mixture into peppers.\n" +
      "4. Bake at 180°C for 25 minutes."
  },
  {
    id: 34,
    name: "Banana Oat Muffins",
    category: "breakfast",
    ingredients: [
      { name: "banana", quantity: 2, unit: "medium" },
      { name: "oats", quantity: 150, unit: "g" },
      { name: "flour", quantity: 100, unit: "g" },
      { name: "egg", quantity: 2, unit: "whole" },
      { name: "milk", quantity: 100, unit: "ml" },
      { name: "baking powder", quantity: 2, unit: "tsp" }
    ],
    allergies: ["gluten", "egg", "milk"],
    instructions:
      "1. Mash banana.\n" +
      "2. Mix with other ingredients.\n" +
      "3. Spoon into muffin tin.\n" +
      "4. Bake at 180°C for 20 minutes."
  },
  {
    id: 35,
    name: "Creamy Tomato Pasta",
    category: "dinner",
    ingredients: [
      { name: "pasta", quantity: 200, unit: "g" },
      { name: "tomato sauce", quantity: 300, unit: "ml" },
      { name: "cream", quantity: 100, unit: "ml" },
      { name: "garlic", quantity: 2, unit: "cloves" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Cook pasta.\n" +
      "2. Simmer tomato sauce with cream and garlic.\n" +
      "3. Combine with pasta."
  },
  {
    id: 36,
    name: "Trail Mix",
    category: "snack",
    ingredients: [
      { name: "nuts", quantity: 100, unit: "g" },
      { name: "raisins", quantity: 50, unit: "g" },
      { name: "chocolate chips", quantity: 50, unit: "g" }
    ],
    allergies: ["nuts"],
    instructions:
      "1. Mix all ingredients together."
  },
  {
    id: 37,
    name: "Avocado Smoothie",
    category: "snack",
    ingredients: [
      { name: "avocado", quantity: 1, unit: "whole" },
      { name: "milk", quantity: 200, unit: "ml" },
      { name: "honey", quantity: 1, unit: "tbsp" },
      { name: "ice", quantity: 1, unit: "cup" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Blend avocado, milk, honey, and ice.\n" +
      "2. Serve chilled."
  },
  {
    id: 38,
    name: "Lentil Soup",
    category: "lunch",
    ingredients: [
      { name: "lentils", quantity: 200, unit: "g" },
      { name: "carrot", quantity: 2, unit: "medium" },
      { name: "onion", quantity: 1, unit: "medium" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "vegetable broth", quantity: 1, unit: "liter" }
    ],
    allergies: [],
    instructions:
      "1. Sauté vegetables.\n" +
      "2. Add lentils and broth.\n" +
      "3. Simmer until soft."
  },
  {
    id: 39,
    name: "Spinach and Feta Wrap",
    category: "lunch",
    ingredients: [
      { name: "tortilla", quantity: 1, unit: "piece" },
      { name: "spinach", quantity: 1, unit: "cup" },
      { name: "feta", quantity: 100, unit: "g" },
      { name: "onion", quantity: 0.5, unit: "medium" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Sauté spinach and onion.\n" +
      "2. Fill tortilla with spinach mixture and feta.\n" +
      "3. Roll and serve."
  },
  {
    id: 40,
    name: "Pancetta Pasta",
    category: "dinner",
    ingredients: [
      { name: "pasta", quantity: 200, unit: "g" },
      { name: "pancetta", quantity: 150, unit: "g" },
      { name: "egg", quantity: 2, unit: "whole" },
      { name: "parmesan cheese", quantity: 50, unit: "g" },
      { name: "black pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten", "egg", "milk"],
    instructions:
      "1. Cook pasta.\n" +
      "2. Fry pancetta.\n" +
      "3. Mix eggs and cheese.\n" +
      "4. Combine all and season."
  },
  {
    id: 41,
    name: "Peach Cobbler",
    category: "dessert",
    ingredients: [
      { name: "peaches", quantity: 500, unit: "g" },
      { name: "flour", quantity: 200, unit: "g" },
      { name: "sugar", quantity: 150, unit: "g" },
      { name: "butter", quantity: 100, unit: "g" },
      { name: "baking powder", quantity: 1, unit: "tsp" },
      { name: "milk", quantity: 150, unit: "ml" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Slice peaches and place in baking dish.\n" +
      "2. Mix flour, sugar, baking powder, milk, and butter.\n" +
      "3. Pour batter over peaches.\n" +
      "4. Bake at 180°C for 40 minutes."
  },
  {
    id: 42,
    name: "Zucchini Noodles with Pesto",
    category: "dinner",
    ingredients: [
      { name: "zucchini", quantity: 2, unit: "medium" },
      { name: "basil pesto", quantity: 4, unit: "tbsp" }
    ],
    allergies: ["nuts"],
    instructions:
      "1. Spiralize zucchini.\n" +
      "2. Toss with pesto.\n" +
      "3. Serve chilled or warm."
  },
  {
    id: 43,
    name: "Cauliflower Rice",
    category: "side",
    ingredients: [
      { name: "cauliflower", quantity: 1, unit: "head" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Pulse cauliflower in food processor until rice-sized.\n" +
      "2. Sauté with olive oil and salt for 5 minutes."
  },
  {
    id: 44,
    name: "Berry Smoothie Bowl",
    category: "breakfast",
    ingredients: [
      { name: "mixed berries", quantity: 1, unit: "cup" },
      { name: "banana", quantity: 1, unit: "whole" },
      { name: "yogurt", quantity: 150, unit: "g" },
      { name: "granola", quantity: 0.5, unit: "cup" }
    ],
    allergies: ["milk", "gluten"],
    instructions:
      "1. Blend berries, banana, and yogurt.\n" +
      "2. Pour into bowl and top with granola."
  },
  {
    id: 45,
    name: "Beef Stir Fry",
    category: "dinner",
    ingredients: [
      { name: "beef strips", quantity: 300, unit: "g" },
      { name: "broccoli", quantity: 1, unit: "cup" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves" }
    ],
    allergies: ["soy"],
    instructions:
      "1. Stir-fry garlic and beef.\n" +
      "2. Add broccoli and soy sauce.\n" +
      "3. Cook until vegetables tender."
  },
  {
    id: 46,
    name: "Cucumber Salad",
    category: "side",
    ingredients: [
      { name: "cucumber", quantity: 1, unit: "medium" },
      { name: "vinegar", quantity: 2, unit: "tbsp" },
      { name: "sugar", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Slice cucumber thin.\n" +
      "2. Mix vinegar, sugar, and salt.\n" +
      "3. Toss cucumber in dressing."
  },
  {
    id: 47,
    name: "Peanut Butter Energy Balls",
    category: "snack",
    ingredients: [
      { name: "peanut butter", quantity: 1, unit: "cup" },
      { name: "oats", quantity: 1, unit: "cup" },
      { name: "honey", quantity: 0.5, unit: "cup" },
      { name: "chia seeds", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["peanut"],
    instructions:
      "1. Mix all ingredients.\n" +
      "2. Roll into balls.\n" +
      "3. Chill before serving."
  },
  {
    id: 48,
    name: "Margherita Pizza",
    category: "dinner",
    ingredients: [
      { name: "pizza dough", quantity: 1, unit: "piece" },
      { name: "tomato sauce", quantity: 100, unit: "ml" },
      { name: "mozzarella", quantity: 150, unit: "g" },
      { name: "basil leaves", quantity: 10, unit: "leaves" }
    ],
    allergies: ["gluten", "milk"],
    instructions:
      "1. Roll out dough.\n" +
      "2. Spread tomato sauce.\n" +
      "3. Add mozzarella and basil.\n" +
      "4. Bake at 220°C for 12 minutes."
  },
  {
    id: 49,
    name: "Carrot Cake",
    category: "dessert",
    ingredients: [
      { name: "carrots", quantity: 200, unit: "g" },
      { name: "flour", quantity: 250, unit: "g" },
      { name: "sugar", quantity: 200, unit: "g" },
      { name: "egg", quantity: 3, unit: "whole" },
      { name: "vegetable oil", quantity: 150, unit: "ml" },
      { name: "baking powder", quantity: 1, unit: "tsp" },
      { name: "cinnamon", quantity: 1, unit: "tsp" }
    ],
    allergies: ["gluten", "egg"],
    instructions:
      "1. Preheat oven to 180°C.\n" +
      "2. Mix dry ingredients.\n" +
      "3. Beat eggs and oil.\n" +
      "4. Combine all with grated carrots.\n" +
      "5. Bake for 40 minutes."
  },
  {
    id: 50,
    name: "Vegetable Omelette",
    category: "breakfast",
    ingredients: [
      { name: "eggs", quantity: 3, unit: "whole" },
      { name: "bell peppers", quantity: 0.5, unit: "cup diced" },
      { name: "onion", quantity: 0.25, unit: "cup diced" },
      { name: "spinach", quantity: 0.5, unit: "cup" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.1, unit: "tsp" }
    ],
    allergies: ["egg"],
    instructions:
      "1. Beat eggs with salt and pepper.\n" +
      "2. Sauté vegetables.\n" +
      "3. Pour eggs over vegetables.\n" +
      "4. Cook until set."
  },
  {
    id: 51,
    name: "Korean Bibimbap",
    category: "dinner",
    ingredients: [
      { name: "rice", quantity: 200, unit: "g" },
      { name: "beef strips", quantity: 200, unit: "g" },
      { name: "spinach", quantity: 2, unit: "cups" },
      { name: "carrots", quantity: 1, unit: "cup julienned" },
      { name: "mushrooms", quantity: 1, unit: "cup sliced" },
      { name: "egg", quantity: 1, unit: "whole" },
      { name: "sesame oil", quantity: 2, unit: "tbsp" },
      { name: "soy sauce", quantity: 3, unit: "tbsp" },
      { name: "garlic", quantity: 3, unit: "cloves" }
    ],
    allergies: ["egg", "soy", "sesame"],
    instructions:
      "1. Cook rice and keep warm.\n" +
      "2. Marinate beef in soy sauce and garlic.\n" +
      "3. Sauté each vegetable separately with sesame oil.\n" +
      "4. Cook beef until done.\n" +
      "5. Fry egg sunny side up.\n" +
      "6. Arrange rice in bowl, top with vegetables, beef, and egg."
  },
  {
    id: 52,
    name: "Mediterranean Quinoa Bowl",
    category: "lunch",
    ingredients: [
      { name: "quinoa", quantity: 150, unit: "g" },
      { name: "chickpeas", quantity: 200, unit: "g" },
      { name: "cherry tomatoes", quantity: 1, unit: "cup halved" },
      { name: "cucumber", quantity: 1, unit: "medium diced" },
      { name: "red onion", quantity: 0.25, unit: "cup diced" },
      { name: "kalamata olives", quantity: 0.5, unit: "cup" },
      { name: "feta cheese", quantity: 100, unit: "g" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "lemon juice", quantity: 2, unit: "tbsp" },
      { name: "oregano", quantity: 1, unit: "tsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Cook quinoa according to package instructions.\n" +
      "2. Rinse and drain chickpeas.\n" +
      "3. Combine quinoa, chickpeas, tomatoes, cucumber, onion, and olives.\n" +
      "4. Whisk olive oil, lemon juice, and oregano for dressing.\n" +
      "5. Toss with dressing and top with crumbled feta."
  },
  {
    id: 53,
    name: "Thai Green Curry",
    category: "dinner",
    ingredients: [
      { name: "chicken breast", quantity: 400, unit: "g" },
      { name: "coconut milk", quantity: 400, unit: "ml" },
      { name: "green curry paste", quantity: 3, unit: "tbsp" },
      { name: "thai eggplant", quantity: 2, unit: "cups chopped" },
      { name: "bamboo shoots", quantity: 1, unit: "cup" },
      { name: "thai basil", quantity: 0.5, unit: "cup" },
      { name: "fish sauce", quantity: 2, unit: "tbsp" },
      { name: "palm sugar", quantity: 1, unit: "tbsp" },
      { name: "lime juice", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["fish"],
    instructions:
      "1. Heat half the coconut milk in a wok.\n" +
      "2. Add curry paste and fry until fragrant.\n" +
      "3. Add chicken and cook until done.\n" +
      "4. Add remaining coconut milk, eggplant, and bamboo shoots.\n" +
      "5. Season with fish sauce, sugar, and lime juice.\n" +
      "6. Garnish with thai basil and serve with rice."
  },
  {
    id: 54,
    name: "Stuffed Portobello Mushrooms",
    category: "dinner",
    ingredients: [
      { name: "portobello mushrooms", quantity: 4, unit: "large caps" },
      { name: "quinoa", quantity: 100, unit: "g" },
      { name: "sun-dried tomatoes", quantity: 0.5, unit: "cup chopped" },
      { name: "goat cheese", quantity: 100, unit: "g" },
      { name: "pine nuts", quantity: 0.25, unit: "cup" },
      { name: "fresh herbs", quantity: 0.25, unit: "cup mixed" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "balsamic vinegar", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["milk", "nuts"],
    instructions:
      "1. Remove stems from mushrooms and scrape out gills.\n" +
      "2. Cook quinoa and let cool.\n" +
      "3. Mix quinoa with tomatoes, goat cheese, pine nuts, and herbs.\n" +
      "4. Brush mushrooms with oil and vinegar.\n" +
      "5. Stuff with quinoa mixture.\n" +
      "6. Bake at 200°C for 20 minutes."
  },
  {
    id: 55,
    name: "Coconut Chia Pudding",
    category: "dessert",
    ingredients: [
      { name: "chia seeds", quantity: 0.25, unit: "cup" },
      { name: "coconut milk", quantity: 1, unit: "cup" },
      { name: "maple syrup", quantity: 2, unit: "tbsp" },
      { name: "vanilla extract", quantity: 0.5, unit: "tsp" },
      { name: "fresh mango", quantity: 0.5, unit: "cup diced" },
      { name: "toasted coconut flakes", quantity: 2, unit: "tbsp" }
    ],
    allergies: [],
    instructions:
      "1. Whisk chia seeds, coconut milk, maple syrup, and vanilla.\n" +
      "2. Let sit for 5 minutes, then whisk again.\n" +
      "3. Refrigerate for at least 2 hours or overnight.\n" +
      "4. Top with mango and toasted coconut before serving."
  },
  {
    id: 56,
    name: "Breakfast Burrito",
    category: "breakfast",
    ingredients: [
      { name: "flour tortilla", quantity: 2, unit: "large" },
      { name: "eggs", quantity: 4, unit: "whole" },
      { name: "black beans", quantity: 0.5, unit: "cup" },
      { name: "cheddar cheese", quantity: 0.5, unit: "cup shredded" },
      { name: "bell pepper", quantity: 0.5, unit: "cup diced" },
      { name: "onion", quantity: 0.25, unit: "cup diced" },
      { name: "salsa", quantity: 0.25, unit: "cup" },
      { name: "avocado", quantity: 1, unit: "whole sliced" }
    ],
    allergies: ["gluten", "egg", "milk"],
    instructions:
      "1. Scramble eggs with salt and pepper.\n" +
      "2. Sauté bell pepper and onion until soft.\n" +
      "3. Warm tortillas and black beans.\n" +
      "4. Fill tortillas with eggs, vegetables, beans, cheese, and salsa.\n" +
      "5. Top with avocado slices and roll tightly."
  },
  {
    id: 57,
    name: "Mushroom Risotto",
    category: "dinner",
    ingredients: [
      { name: "arborio rice", quantity: 200, unit: "g" },
      { name: "mixed mushrooms", quantity: 300, unit: "g" },
      { name: "vegetable stock", quantity: 1, unit: "liter" },
      { name: "white wine", quantity: 100, unit: "ml" },
      { name: "onion", quantity: 1, unit: "medium diced" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "parmesan cheese", quantity: 50, unit: "g grated" },
      { name: "butter", quantity: 2, unit: "tbsp" },
      { name: "olive oil", quantity: 2, unit: "tbsp" }
    ],
    allergies: ["milk", "alcohol"],
    instructions:
      "1. Heat stock in a separate pan and keep warm.\n" +
      "2. Sauté mushrooms in oil until golden, set aside.\n" +
      "3. Sauté onion and garlic until soft.\n" +
      "4. Add rice and stir for 2 minutes.\n" +
      "5. Add wine and stir until absorbed.\n" +
      "6. Add stock one ladle at a time, stirring constantly.\n" +
      "7. Stir in mushrooms, butter, and parmesan before serving."
  },
  {
    id: 58,
    name: "Vietnamese Pho",
    category: "lunch",
    ingredients: [
      { name: "beef bones", quantity: 1, unit: "kg" },
      { name: "rice noodles", quantity: 200, unit: "g" },
      { name: "beef sirloin", quantity: 200, unit: "g thinly sliced" },
      { name: "onion", quantity: 1, unit: "large" },
      { name: "ginger", quantity: 2, unit: "inches" },
      { name: "star anise", quantity: 3, unit: "pods" },
      { name: "cinnamon stick", quantity: 1, unit: "piece" },
      { name: "fish sauce", quantity: 3, unit: "tbsp" },
      { name: "bean sprouts", quantity: 1, unit: "cup" },
      { name: "fresh herbs", quantity: 0.5, unit: "cup mixed" },
      { name: "lime", quantity: 1, unit: "whole" }
    ],
    allergies: ["fish"],
    instructions:
      "1. Char onion and ginger over open flame.\n" +
      "2. Simmer bones with charred vegetables and spices for 2 hours.\n" +
      "3. Strain broth and season with fish sauce.\n" +
      "4. Cook rice noodles according to package instructions.\n" +
      "5. Place noodles and raw beef in bowls.\n" +
      "6. Pour hot broth over to cook beef.\n" +
      "7. Serve with bean sprouts, herbs, and lime wedges."
  },
  {
    id: 59,
    name: "Lemon Garlic Shrimp Pasta",
    category: "dinner",
    ingredients: [
      { name: "linguine pasta", quantity: 200, unit: "g" },
      { name: "large shrimp", quantity: 300, unit: "g peeled" },
      { name: "garlic", quantity: 4, unit: "cloves minced" },
      { name: "lemon", quantity: 1, unit: "whole" },
      { name: "white wine", quantity: 0.5, unit: "cup" },
      { name: "butter", quantity: 3, unit: "tbsp" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "parsley", quantity: 0.25, unit: "cup chopped" },
      { name: "red pepper flakes", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten", "shellfish", "milk", "alcohol"],
    instructions:
      "1. Cook pasta according to package directions.\n" +
      "2. Season shrimp with salt and pepper.\n" +
      "3. Sauté shrimp in oil until pink, remove from pan.\n" +
      "4. Add garlic and red pepper flakes, cook 30 seconds.\n" +
      "5. Add wine and lemon juice, simmer 2 minutes.\n" +
      "6. Return shrimp to pan with butter and parsley.\n" +
      "7. Toss with cooked pasta and serve immediately."
  },
  {
    id: 60,
    name: "Moroccan Tagine",
    category: "dinner",
    ingredients: [
      { name: "lamb shoulder", quantity: 500, unit: "g cubed" },
      { name: "dried apricots", quantity: 0.5, unit: "cup" },
      { name: "almonds", quantity: 0.25, unit: "cup" },
      { name: "onion", quantity: 1, unit: "large" },
      { name: "ginger", quantity: 1, unit: "tbsp fresh grated" },
      { name: "cinnamon", quantity: 1, unit: "tsp" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "saffron", quantity: 0.25, unit: "tsp" },
      { name: "chicken stock", quantity: 2, unit: "cups" },
      { name: "honey", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["nuts"],
    instructions:
      "1. Brown lamb pieces in oil and set aside.\n" +
      "2. Sauté onion until soft, add spices and ginger.\n" +
      "3. Return lamb to pot with stock and saffron.\n" +
      "4. Simmer covered for 1.5 hours.\n" +
      "5. Add apricots and honey, cook 15 minutes more.\n" +
      "6. Garnish with toasted almonds and serve with couscous."
  },
  {
    id: 61,
    name: "Acai Bowl",
    category: "breakfast",
    ingredients: [
      { name: "frozen acai packet", quantity: 1, unit: "packet" },
      { name: "banana", quantity: 1, unit: "whole" },
      { name: "mixed berries", quantity: 0.5, unit: "cup" },
      { name: "granola", quantity: 0.25, unit: "cup" },
      { name: "coconut flakes", quantity: 1, unit: "tbsp" },
      { name: "chia seeds", quantity: 1, unit: "tbsp" },
      { name: "honey", quantity: 1, unit: "tbsp" },
      { name: "almond milk", quantity: 0.25, unit: "cup" }
    ],
    allergies: ["nuts", "gluten"],
    instructions:
      "1. Blend frozen acai with half the banana and almond milk.\n" +
      "2. Pour into bowl and top with granola, berries, and remaining banana.\n" +
      "3. Sprinkle with coconut flakes, chia seeds, and drizzle with honey."
  },
  {
    id: 62,
    name: "Indian Butter Chicken",
    category: "dinner",
    ingredients: [
      { name: "chicken thighs", quantity: 500, unit: "g boneless" },
      { name: "yogurt", quantity: 0.5, unit: "cup" },
      { name: "tomato sauce", quantity: 400, unit: "ml" },
      { name: "heavy cream", quantity: 0.5, unit: "cup" },
      { name: "butter", quantity: 2, unit: "tbsp" },
      { name: "onion", quantity: 1, unit: "medium" },
      { name: "garlic", quantity: 3, unit: "cloves" },
      { name: "ginger", quantity: 1, unit: "tbsp fresh" },
      { name: "garam masala", quantity: 1, unit: "tbsp" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "paprika", quantity: 1, unit: "tsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Marinate chicken in yogurt and half the spices for 30 minutes.\n" +
      "2. Cook chicken until done, set aside.\n" +
      "3. Sauté onion, garlic, and ginger until soft.\n" +
      "4. Add remaining spices and cook 1 minute.\n" +
      "5. Add tomato sauce and simmer 10 minutes.\n" +
      "6. Stir in cream, butter, and cooked chicken.\n" +
      "7. Simmer 5 minutes and serve with rice."
  },
  {
    id: 63,
    name: "Caprese Stuffed Chicken",
    category: "dinner",
    ingredients: [
      { name: "chicken breasts", quantity: 4, unit: "pieces" },
      { name: "fresh mozzarella", quantity: 150, unit: "g sliced" },
      { name: "tomato", quantity: 2, unit: "medium sliced" },
      { name: "fresh basil", quantity: 12, unit: "leaves" },
      { name: "balsamic vinegar", quantity: 2, unit: "tbsp" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Cut pockets in chicken breasts.\n" +
      "2. Stuff with mozzarella, tomato, and basil.\n" +
      "3. Secure with toothpicks and season outside.\n" +
      "4. Sear chicken in oil until golden.\n" +
      "5. Transfer to oven and bake at 180°C for 20 minutes.\n" +
      "6. Drizzle with balsamic vinegar before serving."
  },
  {
    id: 64,
    name: "Chocolate Lava Cake",
    category: "dessert",
    ingredients: [
      { name: "dark chocolate", quantity: 100, unit: "g" },
      { name: "butter", quantity: 100, unit: "g" },
      { name: "eggs", quantity: 2, unit: "whole" },
      { name: "egg yolks", quantity: 2, unit: "pieces" },
      { name: "sugar", quantity: 60, unit: "g" },
      { name: "flour", quantity: 2, unit: "tbsp" },
      { name: "vanilla extract", quantity: 0.5, unit: "tsp" },
      { name: "butter for ramekins", quantity: 1, unit: "tbsp" },
      { name: "cocoa powder", quantity: 1, unit: "tbsp" }
    ],
    allergies: ["milk", "egg", "gluten"],
    instructions:
      "1. Preheat oven to 220°C and butter ramekins.\n" +
      "2. Dust ramekins with cocoa powder.\n" +
      "3. Melt chocolate and butter together.\n" +
      "4. Whisk eggs, yolks, and sugar until thick.\n" +
      "5. Fold in chocolate mixture, flour, and vanilla.\n" +
      "6. Fill ramekins and bake for 12 minutes.\n" +
      "7. Let cool 1 minute, then invert onto plates."
  },
  {
    id: 65,
    name: "Mexican Street Corn Salad",
    category: "side",
    ingredients: [
      { name: "corn kernels", quantity: 3, unit: "cups" },
      { name: "mayonnaise", quantity: 0.25, unit: "cup" },
      { name: "cotija cheese", quantity: 0.5, unit: "cup crumbled" },
      { name: "lime", quantity: 1, unit: "whole" },
      { name: "chili powder", quantity: 1, unit: "tsp" },
      { name: "cilantro", quantity: 0.25, unit: "cup chopped" },
      { name: "jalapeño", quantity: 1, unit: "small minced" }
    ],
    allergies: ["milk", "egg"],
    instructions:
      "1. Char corn in a hot skillet until slightly blackened.\n" +
      "2. Mix mayonnaise, lime juice, and chili powder.\n" +
      "3. Toss corn with dressing, cheese, cilantro, and jalapeño.\n" +
      "4. Serve immediately or chill before serving."
  },
  {
    id: 66,
    name: "Japanese Ramen Bowl",
    category: "dinner",
    ingredients: [
      { name: "ramen noodles", quantity: 200, unit: "g" },
      { name: "chicken broth", quantity: 1, unit: "liter" },
      { name: "pork belly", quantity: 200, unit: "g sliced" },
      { name: "soft boiled eggs", quantity: 2, unit: "whole" },
      { name: "green onions", quantity: 3, unit: "stalks chopped" },
      { name: "miso paste", quantity: 2, unit: "tbsp" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves minced" },
      { name: "ginger", quantity: 1, unit: "tbsp grated" },
      { name: "nori sheets", quantity: 2, unit: "pieces" },
      { name: "bamboo shoots", quantity: 0.5, unit: "cup" }
    ],
    allergies: ["gluten", "egg", "soy"],
    instructions:
      "1. Cook ramen noodles according to package instructions.\n" +
      "2. Heat broth with miso paste, soy sauce, garlic, and ginger.\n" +
      "3. Pan-fry pork belly until crispy.\n" +
      "4. Divide noodles between bowls.\n" +
      "5. Pour hot broth over noodles.\n" +
      "6. Top with pork, soft-boiled eggs, green onions, nori, and bamboo shoots.\n" +
      "7. Serve immediately."
  },
  {
    id: 67,
    name: "Mediterranean Stuffed Eggplant",
    category: "dinner",
    ingredients: [
      { name: "eggplant", quantity: 2, unit: "medium" },
      { name: "ground lamb", quantity: 300, unit: "g" },
      { name: "tomatoes", quantity: 2, unit: "medium diced" },
      { name: "onion", quantity: 1, unit: "medium diced" },
      { name: "pine nuts", quantity: 0.25, unit: "cup" },
      { name: "fresh mint", quantity: 0.25, unit: "cup chopped" },
      { name: "feta cheese", quantity: 100, unit: "g crumbled" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "cinnamon", quantity: 0.5, unit: "tsp" },
      { name: "oregano", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["milk", "nuts"],
    instructions:
      "1. Cut eggplants in half and scoop out flesh, leaving shells.\n" +
      "2. Chop eggplant flesh and sauté with onion until soft.\n" +
      "3. Add ground lamb and cook until browned.\n" +
      "4. Add tomatoes, pine nuts, mint, cinnamon, and oregano.\n" +
      "5. Cook 10 minutes until mixture thickens.\n" +
      "6. Stuff eggplant shells with mixture.\n" +
      "7. Top with crumbled feta and bake at 180°C for 30 minutes."
  },
  {
    id: 68,
    name: "Brazilian Açaí Smoothie",
    category: "breakfast",
    ingredients: [
      { name: "frozen açaí puree", quantity: 200, unit: "g" },
      { name: "banana", quantity: 2, unit: "whole frozen" },
      { name: "guaraná soda", quantity: 100, unit: "ml" },
      { name: "honey", quantity: 2, unit: "tbsp" },
      { name: "granola", quantity: 0.5, unit: "cup" },
      { name: "fresh strawberries", quantity: 0.5, unit: "cup sliced" },
      { name: "coconut flakes", quantity: 2, unit: "tbsp" },
      { name: "cashews", quantity: 0.25, unit: "cup chopped" }
    ],
    allergies: ["nuts", "gluten"],
    instructions:
      "1. Blend frozen açaí, bananas, guaraná, and honey until smooth.\n" +
      "2. Pour into bowls.\n" +
      "3. Top with granola, strawberries, coconut flakes, and cashews.\n" +
      "4. Serve immediately while cold."
  },
  {
    id: 69,
    name: "Ethiopian Doro Wat",
    category: "dinner",
    ingredients: [
      { name: "chicken thighs", quantity: 800, unit: "g" },
      { name: "red onions", quantity: 3, unit: "large diced" },
      { name: "berbere spice", quantity: 3, unit: "tbsp" },
      { name: "tomato paste", quantity: 2, unit: "tbsp" },
      { name: "ginger", quantity: 2, unit: "tbsp grated" },
      { name: "garlic", quantity: 6, unit: "cloves minced" },
      { name: "hard-boiled eggs", quantity: 6, unit: "whole" },
      { name: "vegetable oil", quantity: 0.25, unit: "cup" },
      { name: "chicken stock", quantity: 2, unit: "cups" },
      { name: "butter", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: ["egg", "milk"],
    instructions:
      "1. Cook onions in oil over low heat for 45 minutes until caramelized.\n" +
      "2. Add garlic, ginger, and berbere spice, cook 5 minutes.\n" +
      "3. Add tomato paste and cook 3 minutes.\n" +
      "4. Add chicken pieces and brown on all sides.\n" +
      "5. Add chicken stock and simmer 30 minutes.\n" +
      "6. Add hard-boiled eggs and butter in last 10 minutes.\n" +
      "7. Serve with injera bread or rice."
  },
  {
    id: 70,
    name: "French Onion Soup",
    category: "lunch",
    ingredients: [
      { name: "yellow onions", quantity: 1, unit: "kg thinly sliced" },
      { name: "butter", quantity: 50, unit: "g" },
      { name: "beef stock", quantity: 1.5, unit: "liter" },
      { name: "dry white wine", quantity: 200, unit: "ml" },
      { name: "gruyere cheese", quantity: 200, unit: "g grated" },
      { name: "baguette", quantity: 1, unit: "loaf sliced" },
      { name: "fresh thyme", quantity: 2, unit: "tsp" },
      { name: "bay leaves", quantity: 2, unit: "pieces" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["milk", "gluten", "alcohol"],
    instructions:
      "1. Melt butter in a large pot over medium heat.\n" +
      "2. Add onions and cook slowly for 1 hour until deeply caramelized.\n" +
      "3. Add wine and scrape up browned bits.\n" +
      "4. Add stock, thyme, and bay leaves, simmer 20 minutes.\n" +
      "5. Season with salt and pepper.\n" +
      "6. Ladle into oven-safe bowls.\n" +
      "7. Top with toasted baguette slices and gruyere.\n" +
      "8. Broil until cheese is bubbly and golden."
  },
  {
    id: 71,
    name: "Turkish Börek",
    category: "lunch",
    ingredients: [
      { name: "phyllo pastry", quantity: 500, unit: "g" },
      { name: "feta cheese", quantity: 300, unit: "g crumbled" },
      { name: "spinach", quantity: 500, unit: "g chopped" },
      { name: "eggs", quantity: 3, unit: "whole" },
      { name: "milk", quantity: 200, unit: "ml" },
      { name: "olive oil", quantity: 100, unit: "ml" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "fresh dill", quantity: 0.5, unit: "cup chopped" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "black pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten", "milk", "egg"],
    instructions:
      "1. Sauté onion until soft, add spinach until wilted.\n" +
      "2. Mix spinach mixture with feta, dill, salt, and pepper.\n" +
      "3. Whisk eggs, milk, and half the olive oil.\n" +
      "4. Layer half the phyllo sheets, brushing with oil between layers.\n" +
      "5. Spread filling over phyllo.\n" +
      "6. Top with remaining phyllo, brushing with oil.\n" +
      "7. Pour egg mixture over top.\n" +
      "8. Bake at 180°C for 45 minutes until golden."
  },
  {
    id: 72,
    name: "Peruvian Ceviche",
    category: "lunch",
    ingredients: [
      { name: "white fish fillet", quantity: 500, unit: "g cubed" },
      { name: "lime juice", quantity: 150, unit: "ml fresh" },
      { name: "red onion", quantity: 1, unit: "medium sliced" },
      { name: "aji amarillo", quantity: 2, unit: "peppers minced" },
      { name: "sweet potato", quantity: 2, unit: "medium boiled" },
      { name: "corn kernels", quantity: 1, unit: "cup cooked" },
      { name: "cilantro", quantity: 0.5, unit: "cup chopped" },
      { name: "garlic", quantity: 2, unit: "cloves minced" },
      { name: "ginger", quantity: 1, unit: "tsp grated" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: ["fish"],
    instructions:
      "1. Cut fish into 1-inch cubes and place in glass bowl.\n" +
      "2. Add salt and let sit 10 minutes.\n" +
      "3. Add lime juice, ensuring fish is covered.\n" +
      "4. Add red onion, aji amarillo, garlic, and ginger.\n" +
      "5. Marinate in refrigerator for 2-3 hours.\n" +
      "6. Stir in cilantro just before serving.\n" +
      "7. Serve with sweet potato and corn on the side."
  },
  {
    id: 73,
    name: "Russian Borscht",
    category: "dinner",
    ingredients: [
      { name: "fresh beets", quantity: 800, unit: "g peeled and grated" },
      { name: "beef short ribs", quantity: 500, unit: "g" },
      { name: "cabbage", quantity: 300, unit: "g shredded" },
      { name: "carrots", quantity: 2, unit: "medium diced" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "potatoes", quantity: 3, unit: "medium cubed" },
      { name: "tomato paste", quantity: 2, unit: "tbsp" },
      { name: "sour cream", quantity: 200, unit: "ml" },
      { name: "fresh dill", quantity: 0.25, unit: "cup chopped" },
      { name: "bay leaves", quantity: 2, unit: "pieces" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["milk"],
    instructions:
      "1. Simmer beef ribs in water for 1.5 hours to make broth.\n" +
      "2. Remove meat, shred, and strain broth.\n" +
      "3. Sauté onion and carrots until soft.\n" +
      "4. Add grated beets and tomato paste, cook 10 minutes.\n" +
      "5. Add vegetables to broth with potatoes and bay leaves.\n" +
      "6. Simmer 30 minutes until vegetables are tender.\n" +
      "7. Add shredded cabbage and meat, cook 10 minutes more.\n" +
      "8. Serve hot with sour cream and fresh dill."
  },
  {
    id: 74,
    name: "Greek Moussaka",
    category: "dinner",
    ingredients: [
      { name: "eggplant", quantity: 2, unit: "large sliced" },
      { name: "ground lamb", quantity: 500, unit: "g" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "tomatoes", quantity: 400, unit: "g canned" },
      { name: "bechamel sauce", quantity: 500, unit: "ml" },
      { name: "parmesan cheese", quantity: 100, unit: "g grated" },
      { name: "olive oil", quantity: 100, unit: "ml" },
      { name: "oregano", quantity: 2, unit: "tsp" },
      { name: "cinnamon", quantity: 0.5, unit: "tsp" },
      { name: "nutmeg", quantity: 0.25, unit: "tsp" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: ["milk", "gluten"],
    instructions:
      "1. Salt eggplant slices and let drain 30 minutes.\n" +
      "2. Brush with olive oil and grill until golden.\n" +
      "3. Cook lamb with onion until browned.\n" +
      "4. Add tomatoes, oregano, cinnamon, and nutmeg, simmer 20 minutes.\n" +
      "5. Layer eggplant and meat sauce in baking dish.\n" +
      "6. Top with bechamel sauce and parmesan.\n" +
      "7. Bake at 180°C for 45 minutes until golden.\n" +
      "8. Let rest 15 minutes before serving."
  },
  {
    id: 75,
    name: "Chinese Kung Pao Chicken",
    category: "dinner",
    ingredients: [
      { name: "chicken breast", quantity: 400, unit: "g cubed" },
      { name: "peanuts", quantity: 100, unit: "g roasted" },
      { name: "dried chilies", quantity: 8, unit: "pieces" },
      { name: "soy sauce", quantity: 3, unit: "tbsp" },
      { name: "rice wine", quantity: 2, unit: "tbsp" },
      { name: "cornstarch", quantity: 1, unit: "tbsp" },
      { name: "sugar", quantity: 1, unit: "tsp" },
      { name: "garlic", quantity: 3, unit: "cloves minced" },
      { name: "ginger", quantity: 1, unit: "tbsp minced" },
      { name: "green onions", quantity: 3, unit: "stalks chopped" },
      { name: "vegetable oil", quantity: 3, unit: "tbsp" }
    ],
    allergies: ["peanut", "soy", "alcohol"],
    instructions:
      "1. Marinate chicken in soy sauce, rice wine, and cornstarch.\n" +
      "2. Heat oil in wok over high heat.\n" +
      "3. Stir-fry dried chilies until fragrant.\n" +
      "4. Add chicken and cook until done.\n" +
      "5. Add garlic, ginger, and remaining soy sauce.\n" +
      "6. Stir in peanuts and sugar.\n" +
      "7. Garnish with green onions and serve with rice."
  },
  {
    id: 76,
    name: "Spanish Tortilla",
    category: "breakfast",
    ingredients: [
      { name: "potatoes", quantity: 800, unit: "g thinly sliced" },
      { name: "eggs", quantity: 8, unit: "large" },
      { name: "onion", quantity: 1, unit: "large sliced" },
      { name: "olive oil", quantity: 200, unit: "ml" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["egg"],
    instructions:
      "1. Heat olive oil in large pan over medium heat.\n" +
      "2. Cook potatoes and onions slowly for 20 minutes until tender.\n" +
      "3. Drain potatoes and onions, reserving oil.\n" +
      "4. Beat eggs with salt and pepper.\n" +
      "5. Mix eggs with potato mixture.\n" +
      "6. Heat 2 tbsp reserved oil in pan.\n" +
      "7. Pour in egg mixture and cook 8 minutes.\n" +
      "8. Flip tortilla and cook 5 minutes more.\n" +
      "9. Serve warm or at room temperature."
  },
  {
    id: 77,
    name: "Indian Samosas",
    category: "snack",
    ingredients: [
      { name: "pastry sheets", quantity: 20, unit: "pieces" },
      { name: "potatoes", quantity: 500, unit: "g boiled and diced" },
      { name: "green peas", quantity: 100, unit: "g" },
      { name: "onion", quantity: 1, unit: "medium diced" },
      { name: "cumin seeds", quantity: 1, unit: "tsp" },
      { name: "coriander seeds", quantity: 1, unit: "tsp ground" },
      { name: "garam masala", quantity: 1, unit: "tsp" },
      { name: "ginger", quantity: 1, unit: "tbsp minced" },
      { name: "green chilies", quantity: 2, unit: "minced" },
      { name: "vegetable oil", quantity: 2, unit: "cups for frying" },
      { name: "salt", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten"],
    instructions:
      "1. Heat oil in pan and add cumin seeds.\n" +
      "2. Add onion, ginger, and green chilies, sauté until soft.\n" +
      "3. Add potatoes, peas, and all spices, cook 5 minutes.\n" +
      "4. Let filling cool completely.\n" +
      "5. Place filling in pastry sheets and fold into triangles.\n" +
      "6. Seal edges with water.\n" +
      "7. Deep fry until golden brown and crispy.\n" +
      "8. Serve hot with chutney."
  },
  {
    id: 78,
    name: "Lebanese Tabbouleh",
    category: "side",
    ingredients: [
      { name: "bulgur wheat", quantity: 100, unit: "g fine" },
      { name: "fresh parsley", quantity: 200, unit: "g chopped" },
      { name: "fresh mint", quantity: 50, unit: "g chopped" },
      { name: "tomatoes", quantity: 300, unit: "g diced" },
      { name: "green onions", quantity: 4, unit: "stalks chopped" },
      { name: "lemon juice", quantity: 100, unit: "ml fresh" },
      { name: "olive oil", quantity: 80, unit: "ml" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten"],
    instructions:
      "1. Soak bulgur in warm water for 30 minutes.\n" +
      "2. Drain bulgur and squeeze out excess water.\n" +
      "3. Mix bulgur with chopped parsley and mint.\n" +
      "4. Add diced tomatoes and green onions.\n" +
      "5. Whisk lemon juice, olive oil, salt, and pepper.\n" +
      "6. Pour dressing over salad and toss well.\n" +
      "7. Refrigerate for 2 hours before serving.\n" +
      "8. Serve with romaine lettuce leaves."
  },
  {
    id: 79,
    name: "German Sauerbraten",
    category: "dinner",
    ingredients: [
      { name: "beef roast", quantity: 1.5, unit: "kg" },
      { name: "red wine vinegar", quantity: 500, unit: "ml" },
      { name: "red wine", quantity: 250, unit: "ml" },
      { name: "onions", quantity: 2, unit: "large sliced" },
      { name: "carrots", quantity: 2, unit: "medium sliced" },
      { name: "bay leaves", quantity: 4, unit: "pieces" },
      { name: "juniper berries", quantity: 8, unit: "pieces" },
      { name: "gingersnap cookies", quantity: 6, unit: "pieces crushed" },
      { name: "vegetable oil", quantity: 2, unit: "tbsp" },
      { name: "sugar", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: ["gluten", "alcohol"],
    instructions:
      "1. Marinate beef in vinegar, wine, vegetables, and spices for 3 days.\n" +
      "2. Remove beef and strain marinade, reserving liquid.\n" +
      "3. Sear beef in oil until browned on all sides.\n" +
      "4. Add strained marinade and bring to boil.\n" +
      "5. Cover and braise for 3 hours until tender.\n" +
      "6. Remove beef and strain cooking liquid.\n" +
      "7. Thicken sauce with crushed gingersnaps and sugar.\n" +
      "8. Slice beef and serve with red cabbage and spaetzle."
  },
  {
    id: 80,
    name: "Mexican Pozole",
    category: "dinner",
    ingredients: [
      { name: "pork shoulder", quantity: 1, unit: "kg" },
      { name: "hominy", quantity: 800, unit: "g canned" },
      { name: "dried guajillo chilies", quantity: 6, unit: "pieces" },
      { name: "dried ancho chilies", quantity: 3, unit: "pieces" },
      { name: "onion", quantity: 1, unit: "large quartered" },
      { name: "garlic", quantity: 6, unit: "cloves" },
      { name: "oregano", quantity: 2, unit: "tsp" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "bay leaves", quantity: 3, unit: "pieces" },
      { name: "salt", quantity: 2, unit: "tsp" },
      { name: "cabbage", quantity: 0.25, unit: "head shredded" },
      { name: "radishes", quantity: 4, unit: "sliced" },
      { name: "lime", quantity: 2, unit: "cut in wedges" }
    ],
    allergies: [],
    instructions:
      "1. Simmer pork with onion, garlic, and bay leaves for 2 hours.\n" +
      "2. Remove pork, shred, and strain broth.\n" +
      "3. Toast chilies and soak in hot water 20 minutes.\n" +
      "4. Blend chilies with soaking liquid and spices.\n" +
      "5. Strain chili mixture and add to broth.\n" +
      "6. Add shredded pork and hominy to broth.\n" +
      "7. Simmer 30 minutes to blend flavors.\n" +
      "8. Serve with cabbage, radishes, and lime wedges."
  },
  {
    id: 81,
    name: "Italian Osso Buco",
    category: "dinner",
    ingredients: [
      { name: "veal shanks", quantity: 4, unit: "pieces cross-cut" },
      { name: "flour", quantity: 100, unit: "g" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "carrots", quantity: 2, unit: "medium diced" },
      { name: "celery", quantity: 2, unit: "stalks diced" },
      { name: "tomatoes", quantity: 400, unit: "g canned" },
      { name: "white wine", quantity: 300, unit: "ml" },
      { name: "beef stock", quantity: 500, unit: "ml" },
      { name: "gremolata", quantity: 3, unit: "tbsp" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "butter", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten", "milk", "alcohol"],
    instructions:
      "1. Dredge veal shanks in seasoned flour.\n" +
      "2. Brown shanks in oil and butter on both sides.\n" +
      "3. Remove shanks and sauté vegetables until soft.\n" +
      "4. Add wine and scrape up browned bits.\n" +
      "5. Add tomatoes and stock, return shanks to pot.\n" +
      "6. Cover and braise at 160°C for 2.5 hours.\n" +
      "7. Turn shanks once during cooking.\n" +
      "8. Serve with risotto and sprinkle with gremolata."
  },
  {
    id: 82,
    name: "Korean Bibim Naengmyeon",
    category: "lunch",
    ingredients: [
      { name: "naengmyeon noodles", quantity: 400, unit: "g" },
      { name: "korean pear", quantity: 1, unit: "julienned" },
      { name: "cucumber", quantity: 1, unit: "julienned" },
      { name: "boiled egg", quantity: 2, unit: "halved" },
      { name: "gochujang", quantity: 3, unit: "tbsp" },
      { name: "rice vinegar", quantity: 2, unit: "tbsp" },
      { name: "sesame oil", quantity: 2, unit: "tbsp" },
      { name: "sugar", quantity: 1, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves minced" },
      { name: "sesame seeds", quantity: 1, unit: "tbsp toasted" }
    ],
    allergies: ["egg", "sesame", "gluten"],
    instructions:
      "1. Cook naengmyeon noodles in boiling water until tender.\n" +
      "2. Rinse noodles in cold water until very cold.\n" +
      "3. Mix gochujang, vinegar, sesame oil, sugar, and garlic.\n" +
      "4. Toss noodles with sauce.\n" +
      "5. Top with pear, cucumber, and egg halves.\n" +
      "6. Sprinkle with sesame seeds and serve immediately."
  },
  {
    id: 83,
    name: "Moroccan Pastilla",
    category: "dinner",
    ingredients: [
      { name: "phyllo pastry", quantity: 8, unit: "sheets" },
      { name: "pigeon or chicken", quantity: 1, unit: "whole" },
      { name: "almonds", quantity: 200, unit: "g blanched" },
      { name: "eggs", quantity: 6, unit: "whole" },
      { name: "onions", quantity: 2, unit: "large chopped" },
      { name: "cinnamon", quantity: 2, unit: "tsp" },
      { name: "ginger", quantity: 1, unit: "tsp" },
      { name: "saffron", quantity: 0.5, unit: "tsp" },
      { name: "powdered sugar", quantity: 2, unit: "tbsp" },
      { name: "butter", quantity: 100, unit: "g melted" },
      { name: "fresh parsley", quantity: 0.5, unit: "cup chopped" }
    ],
    allergies: ["gluten", "nuts", "egg", "milk"],
    instructions:
      "1. Braise chicken with onions, saffron, ginger until tender.\n" +
      "2. Shred chicken and reduce cooking liquid.\n" +
      "3. Scramble eggs and mix with chicken and parsley.\n" +
      "4. Toast almonds with cinnamon and sugar.\n" +
      "5. Layer phyllo sheets, brushing with butter.\n" +
      "6. Add almond layer, then chicken mixture.\n" +
      "7. Fold phyllo to encase filling.\n" +
      "8. Bake at 180°C for 30 minutes until golden."
  },
  {
    id: 84,
    name: "Finnish Karjalanpiirakka",
    category: "breakfast",
    ingredients: [
      { name: "rye flour", quantity: 200, unit: "g" },
      { name: "water", quantity: 100, unit: "ml" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "rice", quantity: 200, unit: "g short grain" },
      { name: "milk", quantity: 600, unit: "ml" },
      { name: "butter", quantity: 50, unit: "g" },
      { name: "eggs", quantity: 3, unit: "hard boiled" },
      { name: "butter for topping", quantity: 100, unit: "g softened" }
    ],
    allergies: ["gluten", "milk", "egg"],
    instructions:
      "1. Make dough with rye flour, water, and salt.\n" +
      "2. Cook rice porridge with milk until very thick.\n" +
      "3. Roll dough into thin ovals.\n" +
      "4. Spread rice porridge on dough.\n" +
      "5. Fold edges to create boat shape.\n" +
      "6. Bake at 250°C for 10-12 minutes.\n" +
      "7. Brush with butter and milk mixture while hot.\n" +
      "8. Serve with egg butter (mashed eggs and butter)."
  },
  {
    id: 85,
    name: "Vietnamese Banh Mi",
    category: "lunch",
    ingredients: [
      { name: "baguette", quantity: 2, unit: "pieces" },
      { name: "pork belly", quantity: 300, unit: "g sliced" },
      { name: "pate", quantity: 100, unit: "g" },
      { name: "daikon radish", quantity: 1, unit: "cup pickled" },
      { name: "carrots", quantity: 1, unit: "cup pickled" },
      { name: "cucumber", quantity: 1, unit: "sliced" },
      { name: "cilantro", quantity: 0.5, unit: "cup" },
      { name: "mayonnaise", quantity: 2, unit: "tbsp" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "jalapeño", quantity: 1, unit: "sliced" }
    ],
    allergies: ["gluten", "egg", "soy"],
    instructions:
      "1. Split baguettes lengthwise and hollow out some bread.\n" +
      "2. Marinate pork belly in soy sauce and grill until caramelized.\n" +
      "3. Spread mayonnaise and pate on bread.\n" +
      "4. Layer with pork, pickled vegetables, cucumber.\n" +
      "5. Add cilantro and jalapeño slices.\n" +
      "6. Close sandwich and serve immediately."
  },
  {
    id: 86,
    name: "Polish Pierogi",
    category: "dinner",
    ingredients: [
      { name: "flour", quantity: 400, unit: "g" },
      { name: "eggs", quantity: 2, unit: "whole" },
      { name: "sour cream", quantity: 100, unit: "ml" },
      { name: "potatoes", quantity: 800, unit: "g" },
      { name: "farmer's cheese", quantity: 200, unit: "g" },
      { name: "onions", quantity: 2, unit: "large" },
      { name: "butter", quantity: 100, unit: "g" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten", "egg", "milk"],
    instructions:
      "1. Make dough with flour, eggs, sour cream, and salt.\n" +
      "2. Boil potatoes and mash with cheese and seasoning.\n" +
      "3. Roll dough thin and cut circles.\n" +
      "4. Fill circles with potato mixture and seal edges.\n" +
      "5. Boil pierogi until they float.\n" +
      "6. Pan-fry with caramelized onions and butter.\n" +
      "7. Serve with sour cream."
  },
  {
    id: 87,
    name: "Indonesian Rendang",
    category: "dinner",
    ingredients: [
      { name: "beef chuck", quantity: 1, unit: "kg cubed" },
      { name: "coconut milk", quantity: 800, unit: "ml" },
      { name: "lemongrass", quantity: 3, unit: "stalks" },
      { name: "galangal", quantity: 50, unit: "g sliced" },
      { name: "kaffir lime leaves", quantity: 8, unit: "pieces" },
      { name: "shallots", quantity: 8, unit: "pieces" },
      { name: "garlic", quantity: 6, unit: "cloves" },
      { name: "red chilies", quantity: 8, unit: "pieces" },
      { name: "tamarind paste", quantity: 2, unit: "tbsp" },
      { name: "palm sugar", quantity: 2, unit: "tbsp" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Blend shallots, garlic, and chilies into paste.\n" +
      "2. Fry spice paste with lemongrass, galangal, and lime leaves.\n" +
      "3. Add beef and cook until browned.\n" +
      "4. Add coconut milk and bring to boil.\n" +
      "5. Simmer on low heat for 3-4 hours, stirring frequently.\n" +
      "6. Add tamarind paste and palm sugar in last hour.\n" +
      "7. Cook until sauce is very thick and dark.\n" +
      "8. Serve with steamed rice."
  },
  {
    id: 88,
    name: "Argentine Empanadas",
    category: "lunch",
    ingredients: [
      { name: "flour", quantity: 500, unit: "g" },
      { name: "lard", quantity: 100, unit: "g" },
      { name: "ground beef", quantity: 500, unit: "g" },
      { name: "onions", quantity: 3, unit: "large diced" },
      { name: "hard-boiled eggs", quantity: 3, unit: "chopped" },
      { name: "green olives", quantity: 12, unit: "pitted" },
      { name: "raisins", quantity: 50, unit: "g" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "paprika", quantity: 1, unit: "tbsp" },
      { name: "egg wash", quantity: 1, unit: "egg beaten" }
    ],
    allergies: ["gluten", "egg"],
    instructions:
      "1. Make pastry with flour, lard, and water.\n" +
      "2. Cook beef with onions until browned.\n" +
      "3. Season with cumin and paprika, cool.\n" +
      "4. Mix filling with eggs, olives, and raisins.\n" +
      "5. Roll pastry and cut circles.\n" +
      "6. Fill circles and seal edges with fork.\n" +
      "7. Brush with egg wash.\n" +
      "8. Bake at 200°C for 25 minutes until golden."
  },
  {
    id: 89,
    name: "Scottish Haggis",
    category: "dinner",
    ingredients: [
      { name: "lamb heart", quantity: 200, unit: "g minced" },
      { name: "lamb liver", quantity: 200, unit: "g minced" },
      { name: "lamb lungs", quantity: 200, unit: "g minced" },
      { name: "oatmeal", quantity: 200, unit: "g steel cut" },
      { name: "suet", quantity: 100, unit: "g shredded" },
      { name: "onion", quantity: 1, unit: "large minced" },
      { name: "whisky", quantity: 50, unit: "ml" },
      { name: "thyme", quantity: 1, unit: "tsp" },
      { name: "sage", quantity: 1, unit: "tsp" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten", "alcohol"],
    instructions:
      "1. Boil organ meats for 1.5 hours until tender.\n" +
      "2. Mince cooked meats finely.\n" +
      "3. Toast oatmeal until golden.\n" +
      "4. Mix meats with oatmeal, suet, and onion.\n" +
      "5. Season with herbs, salt, pepper, and whisky.\n" +
      "6. Form into sausage shape and wrap in cloth.\n" +
      "7. Boil for 2 hours.\n" +
      "8. Serve with neeps and tatties (turnips and potatoes)."
  },
  {
    id: 90,
    name: "Swedish Meatballs",
    category: "dinner",
    ingredients: [
      { name: "ground beef", quantity: 300, unit: "g" },
      { name: "ground pork", quantity: 200, unit: "g" },
      { name: "breadcrumbs", quantity: 100, unit: "g" },
      { name: "milk", quantity: 100, unit: "ml" },
      { name: "egg", quantity: 1, unit: "whole" },
      { name: "onion", quantity: 1, unit: "small minced" },
      { name: "butter", quantity: 50, unit: "g" },
      { name: "beef stock", quantity: 500, unit: "ml" },
      { name: "cream", quantity: 200, unit: "ml" },
      { name: "lingonberry jam", quantity: 100, unit: "g" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "white pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["gluten", "milk", "egg"],
    instructions:
      "1. Soak breadcrumbs in milk until soft.\n" +
      "2. Mix meats with breadcrumbs, egg, onion, and seasonings.\n" +
      "3. Form into small balls.\n" +
      "4. Brown meatballs in butter on all sides.\n" +
      "5. Remove meatballs and make gravy with drippings.\n" +
      "6. Add stock and cream to pan, simmer until thick.\n" +
      "7. Return meatballs to sauce and heat through.\n" +
      "8. Serve with lingonberry jam and boiled potatoes."
  },
  {
    id: 91,
    name: "Jamaican Jerk Chicken",
    category: "dinner",
    ingredients: [
      { name: "chicken pieces", quantity: 1, unit: "kg" },
      { name: "scotch bonnet peppers", quantity: 3, unit: "minced" },
      { name: "allspice berries", quantity: 2, unit: "tbsp ground" },
      { name: "thyme", quantity: 2, unit: "tbsp fresh" },
      { name: "garlic", quantity: 6, unit: "cloves" },
      { name: "ginger", quantity: 50, unit: "g fresh" },
      { name: "green onions", quantity: 4, unit: "stalks" },
      { name: "lime juice", quantity: 100, unit: "ml" },
      { name: "soy sauce", quantity: 3, unit: "tbsp" },
      { name: "brown sugar", quantity: 2, unit: "tbsp" },
      { name: "vegetable oil", quantity: 3, unit: "tbsp" }
    ],
    allergies: ["soy"],
    instructions:
      "1. Blend all marinade ingredients except chicken.\n" +
      "2. Score chicken and rub with marinade.\n" +
      "3. Marinate overnight in refrigerator.\n" +
      "4. Remove from marinade and let come to room temperature.\n" +
      "5. Grill over medium-high heat, turning frequently.\n" +
      "6. Cook 25-30 minutes until internal temp reaches 74°C.\n" +
      "7. Let rest 5 minutes before serving.\n" +
      "8. Serve with rice and beans."
  },
  {
    id: 92,
    name: "Hungarian Goulash",
    category: "dinner",
    ingredients: [
      { name: "beef chuck", quantity: 1, unit: "kg cubed" },
      { name: "onions", quantity: 4, unit: "large sliced" },
      { name: "sweet paprika", quantity: 3, unit: "tbsp" },
      { name: "tomato paste", quantity: 2, unit: "tbsp" },
      { name: "beef stock", quantity: 1, unit: "liter" },
      { name: "potatoes", quantity: 600, unit: "g cubed" },
      { name: "bell peppers", quantity: 2, unit: "sliced" },
      { name: "caraway seeds", quantity: 1, unit: "tsp" },
      { name: "marjoram", quantity: 1, unit: "tsp" },
      { name: "lard", quantity: 50, unit: "g" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Cook onions in lard until golden brown.\n" +
      "2. Add paprika and cook 1 minute.\n" +
      "3. Add beef and brown on all sides.\n" +
      "4. Add tomato paste and cook 2 minutes.\n" +
      "5. Add stock, caraway seeds, and marjoram.\n" +
      "6. Simmer covered for 1.5 hours.\n" +
      "7. Add potatoes and peppers, cook 30 minutes more.\n" +
      "8. Adjust seasoning and serve with bread."
  },
  {
    id: 93,
    name: "Portuguese Pastéis de Nata",
    category: "dessert",
    ingredients: [
      { name: "puff pastry", quantity: 300, unit: "g" },
      { name: "milk", quantity: 250, unit: "ml" },
      { name: "heavy cream", quantity: 250, unit: "ml" },
      { name: "sugar", quantity: 200, unit: "g" },
      { name: "egg yolks", quantity: 6, unit: "pieces" },
      { name: "cornstarch", quantity: 30, unit: "g" },
      { name: "vanilla extract", quantity: 1, unit: "tsp" },
      { name: "lemon zest", quantity: 1, unit: "tsp" },
      { name: "cinnamon", quantity: 1, unit: "tsp" }
    ],
    allergies: ["gluten", "milk", "egg"],
    instructions:
      "1. Line muffin tins with puff pastry.\n" +
      "2. Heat milk and cream to just below boiling.\n" +
      "3. Whisk cornstarch with small amount of milk mixture.\n" +
      "4. Add cornstarch mixture back to milk and whisk until thick.\n" +
      "5. Whisk egg yolks with sugar until pale.\n" +
      "6. Combine custard mixtures and add vanilla and lemon zest.\n" +
      "7. Fill pastry cases 3/4 full.\n" +
      "8. Bake at 250°C for 15 minutes until tops are spotted brown."
  },
  {
    id: 94,
    name: "Australian Meat Pie",
    category: "lunch",
    ingredients: [
      { name: "shortcrust pastry", quantity: 400, unit: "g" },
      { name: "puff pastry", quantity: 200, unit: "g" },
      { name: "ground beef", quantity: 500, unit: "g" },
      { name: "beef stock", quantity: 300, unit: "ml" },
      { name: "onion", quantity: 1, unit: "large diced" },
      { name: "worcestershire sauce", quantity: 2, unit: "tbsp" },
      { name: "tomato sauce", quantity: 2, unit: "tbsp" },
      { name: "flour", quantity: 2, unit: "tbsp" },
      { name: "egg", quantity: 1, unit: "beaten for wash" },
      { name: "salt", quantity: 0.5, unit: "tsp" },
      { name: "black pepper", quantity: 0.25, unit: "tsp" }
    ],
    allergies: ["gluten", "egg"],
    instructions:
      "1. Line pie tins with shortcrust pastry.\n" +
      "2. Cook beef and onion until browned.\n" +
      "3. Add flour and cook 2 minutes.\n" +
      "4. Add stock, worcestershire sauce, and tomato sauce.\n" +
      "5. Simmer until thick, season with salt and pepper.\n" +
      "6. Fill pastry cases with meat mixture.\n" +
      "7. Top with puff pastry and seal edges.\n" +
      "8. Brush with egg wash and bake at 200°C for 25 minutes."
  },
  {
    id: 95,
    name: "Nigerian Jollof Rice",
    category: "dinner",
    ingredients: [
      { name: "long grain rice", quantity: 400, unit: "g" },
      { name: "chicken pieces", quantity: 800, unit: "g" },
      { name: "tomato paste", quantity: 100, unit: "g" },
      { name: "bell peppers", quantity: 3, unit: "red, blended" },
      { name: "onions", quantity: 2, unit: "large diced" },
      { name: "garlic", quantity: 4, unit: "cloves minced" },
      { name: "ginger", quantity: 2, unit: "tbsp minced" },
      { name: "chicken stock", quantity: 800, unit: "ml" },
      { name: "vegetable oil", quantity: 100, unit: "ml" },
      { name: "curry powder", quantity: 2, unit: "tsp" },
      { name: "thyme", quantity: 1, unit: "tsp" },
      { name: "bay leaves", quantity: 3, unit: "pieces" }
    ],
    allergies: [],
    instructions:
      "1. Season and fry chicken pieces until golden.\n" +
      "2. Fry tomato paste in oil until it darkens.\n" +
      "3. Add blended peppers and onions, cook until thick.\n" +
      "4. Add garlic, ginger, and spices, cook 5 minutes.\n" +
      "5. Add chicken and stock, bring to boil.\n" +
      "6. Add rice and stir once.\n" +
      "7. Cover and cook on low heat for 20 minutes.\n" +
      "8. Let rest 10 minutes before serving."
  },
  {
    id: 96,
    name: "Greek Dolmades",
    category: "snack",
    ingredients: [
      { name: "grape leaves", quantity: 30, unit: "pieces preserved" },
      { name: "rice", quantity: 200, unit: "g short grain" },
      { name: "ground lamb", quantity: 300, unit: "g" },
      { name: "onions", quantity: 2, unit: "small minced" },
      { name: "pine nuts", quantity: 50, unit: "g" },
      { name: "fresh dill", quantity: 0.25, unit: "cup chopped" },
      { name: "fresh mint", quantity: 0.25, unit: "cup chopped" },
      { name: "lemon juice", quantity: 100, unit: "ml" },
      { name: "olive oil", quantity: 100, unit: "ml" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "black pepper", quantity: 0.5, unit: "tsp" }
    ],
    allergies: ["nuts"],
    instructions:
      "1. Rinse grape leaves and remove stems.\n" +
      "2. Mix rice, lamb, onions, nuts, herbs, and seasonings.\n" +
      "3. Place filling on each leaf and roll tightly.\n" +
      "4. Layer rolled dolmades in pot.\n" +
      "5. Add lemon juice, olive oil, and enough water to cover.\n" +
      "6. Weight down with plate and simmer 45 minutes.\n" +
      "7. Cool in cooking liquid.\n" +
      "8. Serve at room temperature with yogurt."
  },
  {
    id: 97,
    name: "Cuban Ropa Vieja",
    category: "dinner",
    ingredients: [
      { name: "beef flank steak", quantity: 1, unit: "kg" },
      { name: "bell peppers", quantity: 3, unit: "sliced" },
      { name: "onions", quantity: 2, unit: "large sliced" },
      { name: "tomatoes", quantity: 400, unit: "g canned" },
      { name: "garlic", quantity: 6, unit: "cloves minced" },
      { name: "cumin", quantity: 2, unit: "tsp" },
      { name: "oregano", quantity: 1, unit: "tbsp" },
      { name: "bay leaves", quantity: 3, unit: "pieces" },
      { name: "white wine", quantity: 200, unit: "ml" },
      { name: "olive oil", quantity: 3, unit: "tbsp" },
      { name: "capers", quantity: 2, unit: "tbsp" },
      { name: "green olives", quantity: 0.5, unit: "cup" }
    ],
    allergies: ["alcohol"],
    instructions:
      "1. Braise beef with bay leaves in water for 2 hours.\n" +
      "2. Remove beef and shred with forks.\n" +
      "3. Sauté onions and peppers until soft.\n" +
      "4. Add garlic and cook 1 minute.\n" +
      "5. Add tomatoes, wine, and spices.\n" +
      "6. Simmer 15 minutes until sauce thickens.\n" +
      "7. Add shredded beef, capers, and olives.\n" +
      "8. Simmer 10 minutes more and serve with rice."
  },
  {
    id: 98,
    name: "Ethiopian Injera",
    category: "side",
    ingredients: [
      { name: "teff flour", quantity: 400, unit: "g" },
      { name: "water", quantity: 500, unit: "ml" },
      { name: "active dry yeast", quantity: 1, unit: "tsp" },
      { name: "warm water", quantity: 50, unit: "ml" },
      { name: "salt", quantity: 1, unit: "tsp" }
    ],
    allergies: [],
    instructions:
      "1. Dissolve yeast in warm water, let foam 10 minutes.\n" +
      "2. Mix teff flour with water to make smooth batter.\n" +
      "3. Add yeast mixture and salt.\n" +
      "4. Cover and ferment at room temperature for 3 days.\n" +
      "5. Strain batter to remove lumps.\n" +
      "6. Cook thin layer in non-stick pan over medium heat.\n" +
      "7. Cook until bubbles form and surface sets.\n" +
      "8. Remove carefully and cool on clean cloth."
  },
  {
    id: 99,
    name: "Peruvian Pisco Sour",
    category: "snack",
    ingredients: [
      { name: "pisco", quantity: 180, unit: "ml" },
      { name: "lime juice", quantity: 60, unit: "ml fresh" },
      { name: "simple syrup", quantity: 30, unit: "ml" },
      { name: "egg white", quantity: 2, unit: "pieces" },
      { name: "angostura bitters", quantity: 6, unit: "drops" },
      { name: "ice", quantity: 1, unit: "cup" }
    ],
    allergies: ["alcohol", "egg"],
    instructions:
      "1. Add pisco, lime juice, and simple syrup to shaker.\n" +
      "2. Add egg whites and dry shake vigorously.\n" +
      "3. Add ice and shake again until very cold.\n" +
      "4. Strain into coupe glasses.\n" +
      "5. Top with 3 drops of bitters per glass.\n" +
      "6. Serve immediately."
  },
  {
    id: 100,
    name: "Turkish Delight",
    category: "dessert",
    ingredients: [
      { name: "sugar", quantity: 400, unit: "g" },
      { name: "cornstarch", quantity: 120, unit: "g" },
      { name: "cream of tartar", quantity: 1, unit: "tsp" },
      { name: "water", quantity: 500, unit: "ml" },
      { name: "rosewater", quantity: 2, unit: "tbsp" },
      { name: "food coloring", quantity: 3, unit: "drops pink" },
      { name: "powdered sugar", quantity: 200, unit: "g" },
      { name: "pistachios", quantity: 100, unit: "g chopped" }
    ],
    allergies: ["nuts"],
    instructions:
      "1. Mix cornstarch with 125ml water until smooth.\n" +
      "2. Boil remaining water with sugar and cream of tartar.\n" +
      "3. Add cornstarch mixture and whisk constantly.\n" +
      "4. Cook on low heat for 1 hour, stirring frequently.\n" +
      "5. Add rosewater, food coloring, and pistachios.\n" +
      "6. Pour into greased pan and let set overnight.\n" +
      "7. Cut into squares and dust with powdered sugar.\n" +
      "8. Store in airtight container."
  }
];



export default recipes;

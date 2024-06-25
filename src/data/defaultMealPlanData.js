function getDefaultData(timeFrame) {
  let data = [];

  if (timeFrame === "daily") {
    //daily
    console.log("get Daily");
    data = {
      meals: [
        {
          id: 647268,
          imageType: "jpg",
          title: "Honey Pine Nuts Muffins",
          readyInMinutes: 30,
          servings: 12,
          sourceUrl: "https://spoonacular.com/honey-pine-nuts-muffins-647268",
        },
        {
          id: 650127,
          imageType: "jpg",
          title: "Linguine in Cream Sauce with Poached Eggs and Bacon",
          readyInMinutes: 25,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/linguine-in-cream-sauce-with-poached-eggs-and-bacon-650127",
        },
        {
          id: 634404,
          imageType: "jpg",
          title: "Basic Risotto",
          readyInMinutes: 45,
          servings: 2,
          sourceUrl: "https://spoonacular.com/basic-risotto-634404",
        },
      ],
      nutrients: {
        calories: 1971.7,
        protein: 54.62,
        fat: 70.83,
        carbohydrates: 274.89,
      },
    };
  } else {
    //weekly
    data = {
      week: {
        monday: {
          meals: [
            {
              id: 648632,
              imageType: "jpg",
              title: "Jules' Banana Bread",
              readyInMinutes: 45,
              servings: 4,
              sourceUrl: "https://spoonacular.com/jules-banana-bread-648632",
            },
            {
              id: 642585,
              imageType: "jpg",
              title: "Farfalle with fresh tomatoes, basil and mozzarella",
              readyInMinutes: 15,
              servings: 4,
              sourceUrl:
                "https://spoonacular.com/farfalle-with-fresh-tomatoes-basil-and-mozzarella-642585",
            },
            {
              id: 641687,
              imageType: "jpg",
              title: "Dry Mee Siam",
              readyInMinutes: 45,
              servings: 3,
              sourceUrl: "https://spoonacular.com/dry-mee-siam-641687",
            },
          ],
          nutrients: {
            calories: 2073.18,
            protein: 53.89,
            fat: 69.43,
            carbohydrates: 311.48,
          },
        },
        tuesday: {
          meals: [
            {
              id: 665257,
              imageType: "jpg",
              title: "Whole Grain Pumpkin Bread",
              readyInMinutes: 45,
              servings: 24,
              sourceUrl:
                "https://spoonacular.com/whole-grain-pumpkin-bread-665257",
            },
            {
              id: 1697625,
              imageType: "jpg",
              title:
                "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
              readyInMinutes: 25,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
            },
            {
              id: 1697697,
              imageType: "jpg",
              title: "One-Pan Butternut Squash Risotto with Mushrooms",
              readyInMinutes: 70,
              servings: 4,
              sourceUrl:
                "https://spoonacular.com/one-pan-butternut-squash-risotto-with-mushrooms-1697697",
            },
          ],
          nutrients: {
            calories: 1920.34,
            protein: 56.08,
            fat: 64.36,
            carbohydrates: 287.26,
          },
        },
        wednesday: {
          meals: [
            {
              id: 663853,
              imageType: "jpg",
              title: "Tropical Breakfast Quinoa",
              readyInMinutes: 45,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/tropical-breakfast-quinoa-663853",
            },
            {
              id: 715769,
              imageType: "jpg",
              title: "Broccolini Quinoa Pilaf",
              readyInMinutes: 30,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/broccolini-quinoa-pilaf-715769",
            },
            {
              id: 634404,
              imageType: "jpg",
              title: "Basic Risotto",
              readyInMinutes: 45,
              servings: 2,
              sourceUrl: "https://spoonacular.com/basic-risotto-634404",
            },
          ],
          nutrients: {
            calories: 1869.7,
            protein: 51.18,
            fat: 60.89,
            carbohydrates: 278.23,
          },
        },
        thursday: {
          meals: [
            {
              id: 653019,
              imageType: "jpg",
              title: "Never Fail Pumpkin Muffins",
              readyInMinutes: 45,
              servings: 12,
              sourceUrl:
                "https://spoonacular.com/never-fail-pumpkin-muffins-653019",
            },
            {
              id: 1697625,
              imageType: "jpg",
              title:
                "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
              readyInMinutes: 25,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
            },
            {
              id: 633093,
              imageType: "jpg",
              title: "Autumn Fried Rice with Buffalo Nuts®",
              readyInMinutes: 45,
              servings: 8,
              sourceUrl:
                "https://spoonacular.com/autumn-fried-rice-with-buffalo-nuts-633093",
            },
          ],
          nutrients: {
            calories: 1919.22,
            protein: 53.93,
            fat: 67.88,
            carbohydrates: 271.2,
          },
        },
        friday: {
          meals: [
            {
              id: 782598,
              imageType: "jpg",
              title: "Toasted Coconut Pancakes with Toasted Coconut Sauce",
              readyInMinutes: 45,
              servings: 9,
              sourceUrl:
                "https://spoonacular.com/toasted-coconut-pancakes-with-toasted-coconut-sauce-782598",
            },
            {
              id: 982371,
              imageType: "jpg",
              title: "Instant Pot Quinoa Grain Bowl",
              readyInMinutes: 13,
              servings: 4,
              sourceUrl:
                "https://spoonacular.com/instant-pot-quinoa-grain-bowl-982371",
            },
            {
              id: 634404,
              imageType: "jpg",
              title: "Basic Risotto",
              readyInMinutes: 45,
              servings: 2,
              sourceUrl: "https://spoonacular.com/basic-risotto-634404",
            },
          ],
          nutrients: {
            calories: 1972.44,
            protein: 49.9,
            fat: 71.8,
            carbohydrates: 285.8,
          },
        },
        saturday: {
          meals: [
            {
              id: 644675,
              imageType: "jpg",
              title: "Ginger-Wheat Mulberry Muffins",
              readyInMinutes: 45,
              servings: 20,
              sourceUrl:
                "https://spoonacular.com/ginger-wheat-mulberry-muffins-644675",
            },
            {
              id: 1697625,
              imageType: "jpg",
              title:
                "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
              readyInMinutes: 25,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
            },
            {
              id: 633093,
              imageType: "jpg",
              title: "Autumn Fried Rice with Buffalo Nuts®",
              readyInMinutes: 45,
              servings: 8,
              sourceUrl:
                "https://spoonacular.com/autumn-fried-rice-with-buffalo-nuts-633093",
            },
          ],
          nutrients: {
            calories: 1864.7,
            protein: 53.04,
            fat: 64.23,
            carbohydrates: 267.02,
          },
        },
        sunday: {
          meals: [
            {
              id: 637792,
              imageType: "jpg",
              title: "Cherry, Date & Nut Muffins",
              readyInMinutes: 45,
              servings: 12,
              sourceUrl:
                "https://spoonacular.com/cherry-date-nut-muffins-637792",
            },
            {
              id: 650127,
              imageType: "jpg",
              title: "Linguine in Cream Sauce with Poached Eggs and Bacon",
              readyInMinutes: 25,
              servings: 2,
              sourceUrl:
                "https://spoonacular.com/linguine-in-cream-sauce-with-poached-eggs-and-bacon-650127",
            },
            {
              id: 634404,
              imageType: "jpg",
              title: "Basic Risotto",
              readyInMinutes: 45,
              servings: 2,
              sourceUrl: "https://spoonacular.com/basic-risotto-634404",
            },
          ],
          nutrients: {
            calories: 1919.24,
            protein: 55.23,
            fat: 67.34,
            carbohydrates: 269.84,
          },
        },
      },
    };
  }

  return data;
}

export { getDefaultData };

/**
 * transforms the stages data into a form that is more easy cod woth
 * @param apiStagesData
 * @returns {{stages: any[]}}
 */
export function transformRSkillsCCStagesData(apiStagesData) {
  const apiStages = apiStagesData.stage;
  const stages = Array(apiStages.length);
  apiStages.forEach((aStage, index) => {
    const stage = {
      id: aStage.$.id,
      name: aStage.$.name,
      bundles: [],
    };

    const apiBundles = aStage.bundles[0].bundle;
    apiBundles.forEach(aBundle => {
      const bundle = {
        id: aBundle.$.id,
        name: aBundle.$.name,
        tests: [],
      };

      const apiTests = aBundle.tests[0].test;
      apiTests.forEach(aTest => {
        const test = {
          atGradePdf: aTest.$.at_grade_pdf,
          belowGradePdf: aTest.$.below_grade_pdf,
          description: aTest.$.description,
          name: aTest.$.name,
          number: aTest.$.number,
        };
        bundle.tests.push(test);
      });
      stage.bundles.push(bundle);
    });
    stages[index] = stage;
  });
  return {
    stages,
  };
}

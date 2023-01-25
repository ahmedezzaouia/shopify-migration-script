async function getSmartCollections(store) {
  let smartCollections = [];
  let params = { limit: 100 };
  while (params !== undefined) {
    const newCollections = await store.smartCollection.list(params);
    newCollections.forEach((item) => smartCollections.push(item));
    params = newCollections.nextPageParameters;
  }
  return smartCollections;
}

async function getNormalCollections(store) {
  let normalCollections = [];
  let params = { limit: 100 };
  while (params !== undefined) {
    const newCollections = await store.customCollection.list(params);
    newCollections.forEach((item) => normalCollections.push(item));
    params = newCollections.nextPageParameters;
  }
  return normalCollections;
}

async function cloneSmartCollections(originalStore, targetStore) {
  try {
    let smartCollections = await getSmartCollections(originalStore);
    let targetStoreCollections = await getSmartCollections(targetStore);
    console.log("***********************************************************");
    console.log(
      "smart Collectons that you have in your target store are : ",
      targetStoreCollections.length
    );
    console.log(
      "smart Collections to be Cloned from Original Store are : ",
      smartCollections.length
    );
    console.log("***********************************************************");

    let j = 1;
    for (let collection of smartCollections) {
      try {
        if (j % 100 === 0) {
          console.log(
            "----------------------------------------------------------"
          );
          console.log(
            "let the API take a break for 15 seconds For Rate limit...."
          );
          await new Promise((resolve) => setTimeout(resolve, 15000));
        }

        if (
          targetStoreCollections.find((c) => c.handle === collection.handle)
        ) {
          // collection already exist, just ignore
          console.log(
            `smart collection number ${j} of ${smartCollections.length} already Exist in targetStore`
          );
        } else {
          // smart collection is not found so will create new one
          await targetStore.smartCollection.create(collection);
          console.log(
            `smart collection number ${j} of ${smartCollections.length} is created`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 700));
        j++;
      } catch (error) {}
    }
  } catch (error) {
    console.log(error);
  }
}

async function cloneNormalCollections(originalStore, targetStore) {
  try {
    let normalCollections = await getNormalCollections(originalStore);
    let targetStoreCollections = await getNormalCollections(targetStore);
    console.log("***********************************************************");
    console.log(
      "normal Collectons that you have in your target store are : ",
      targetStoreCollections.length
    );
    console.log(
      "normal Collections to be Cloned from Original Store are : ",
      normalCollections.length
    );
    console.log("***********************************************************");

    let j = 1;
    for (let collection of normalCollections) {
      try {
        if (j % 100 === 0) {
          console.log(
            "----------------------------------------------------------"
          );
          console.log(
            "let the API take a break for 15 seconds for Rate Limit...."
          );
          await new Promise((resolve) => setTimeout(resolve, 15000));
        }
        if (
          targetStoreCollections.find((c) => c.handle === collection.handle)
        ) {
          // the collection already exist
          console.log(
            `collection number ${j} of ${normalCollections.length} already Exist in targetStore`
          );
        } else {
          // normal collection is not found so will create new one
          await targetStore.customCollection.create(collection);
          console.log(
            `normal collection number ${j} of ${normalCollections.length} is created`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 700));
        j++;
      } catch (error) {}
    }
  } catch (error) {
    console.log(error);
  }
}

async function cloneCollections(originalStore, targetStore) {
  try {
    await cloneSmartCollections(originalStore, targetStore);
    console.log("******************************************************");
    console.log("switching to Clone Normal Collections in 15 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 15000));
    await cloneNormalCollections(originalStore, targetStore);
  } catch (error) {
    console.log(error);
  }
}

export default cloneCollections;

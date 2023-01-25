async function getPagesFromStore(store) {
  let pages = [];
  let params = { limit: 50 };
  // const pageCount = await store.page.count();
  while (params !== undefined) {
    const newPages = await store.page.list(params);
    newPages.forEach((page) => pages.push(page));
    params = newPages.nextPageParameters;
  }
  return pages;
}

async function clonePages(originalStore, targetStore) {
  try {
    const pages = await getPagesFromStore(originalStore);
    const targeStorePages = await getPagesFromStore(targetStore);
    console.log("***********************************************************");
    console.log(
      "pages that you have in your Target Store are: ",
      targeStorePages.length
    );
    console.log("pages to be cloned from Original Store are: ", pages.length);
    console.log("***********************************************************");
    let i = 1;
    for (let page of pages) {
      try {
        if (i % 100 === 0) {
          console.log(
            "let the API take a break for 15 seconds for Rate Limit...."
          );
          await new Promise((resolve) => setTimeout(resolve, 15000));
        }
        if (targeStorePages.find((p) => p.handle === page.handle)) {
          // page is already exist in targetStore just ignore
          console.log(
            `page number ${i} of ${pages.length} already Exist in your targetStore`
          );
        } else {
          // page not found so we have to create the page
          await targetStore.page.create(page);
          console.log(`page number ${i} of ${pages.length} is created`);
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        i++;
      } catch (error) {}
    }
  } catch (error) {
    console.log(error);
  }
}

export default clonePages;



export const buildFileTree = (files) => {
  let tree = {};

  files.forEach( (filePath) => {
    let parts = filePath.split("/");
    let current = tree;

    parts.forEach((part,index) => {
        if(!current[part]) {
            current[part] = index === parts.length - 1 ? null : {} ;
        }

        current = current[part];
    })
  });

  return tree;
}

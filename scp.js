const fs = require('fs');

async function main() {

    const filename = process.argv[2];
    const fileContent = fs.readFileSync(filename, 'utf8');
    const lines = fileContent.split('\n');
    const exportDir = "./export";

    let chapterNum = 0;
    let chapterText = '';
    let chapterFilename = `第0章.txt`;

    const myRegex = /(第.{1,6}?章)/; // 正则表达式
    //const isMatched = myRegex.test(myString); // 使用test()方法来检查是否匹配

    for (let line of lines) {
        //console.log("cn = " + chapterNum)
        
        // 將當前行加入章節內容
        chapterText += line + '\n';

        let trimedLine = line.trim();

        if (myRegex.test(trimedLine)) {
            console.log("enter line = " + trimedLine)
            // 創建新的章節文件並寫入內容
            fs.writeFileSync(`${exportDir}/${chapterFilename}`, chapterText);
            
            // 重設章節內容，進入下一章
            chapterNum++;
            chapterText = line;
            //chapterFilename = `第${chapterNum}章 - ${trimedLine}.txt`;
            chapterFilename = `${chapterNum} - ${trimedLine}.txt`;
            continue;
        }


        // if (chapterNum > 10) {
        //     console.log("exit")
        //     break;
        // }



    }

    // 將最後一章的內容寫入文件
    fs.writeFileSync(`${exportDir}/${chapterFilename}`, chapterText);

    console.log('完成！');

}


main();
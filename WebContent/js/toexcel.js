 //第一种方法
        function method1(tableid) {

            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");
            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            oSheet.Paste();
            oXL.Visible = true;

        }
        //第二种方法
        function method2(tableid)
        {

            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");
            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            var Lenr = curTbl.rows.length;
            for (i = 0; i < Lenr; i++)
            {        var Lenc = curTbl.rows(i).cells.length;
                for (j = 0; j < Lenc; j++)
                {
                    oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;

                }

            }
            oXL.Visible = true;
        }
        //第三种方法
        function getXlsFromTbl(inTblId, inWindow){

            try {
                var allStr = "";
                var curStr = "";
                if (inTblId != null && inTblId != "" && inTblId != "null") {

                    curStr = getTblData(inTblId, inWindow);

                }
                if (curStr != null) {
                    allStr += curStr;
                }
                else {
                    alert("你要导出的表不存在");
                    return;
                }
                var fileName = getExcelFileName();
                doFileExport(fileName, allStr);

            }

            catch(e) {

                alert("导出发生异常:" + e.name + "->" + e.description + "!");

            }

        }

        function getTblData(inTbl, inWindow) {

            var rows = 0;
            var tblDocument = document;
            if (!!inWindow && inWindow != "") {

                if (!document.all(inWindow)) {
                    return null;
                }

                else {
                    tblDocument = eval(inWindow).document;
                }

            }

            var curTbl = tblDocument.getElementById(inTbl);
            var outStr = "";
            if (curTbl != null) {
                for (var j = 0; j < curTbl.rows.length; j++) {
                    for (var i = 0; i < curTbl.rows[j].cells.length; i++) {

                        if (i == 0 && rows > 0) {
                            outStr += " \t";
                            rows -= 1;
                        }

                        outStr += curTbl.rows[j].cells[i].innerText + "\t";
                        if (curTbl.rows[j].cells[i].colSpan > 1) {
                            for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
                                outStr += " \t";
                            }
                        }
                        if (i == 0) {
                            if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
                                rows = curTbl.rows[j].cells[i].rowSpan - 1;
                            }
                        }
                    }
                    outStr += "\n";
                }
            }

            else {
                outStr = null;
                alert(inTbl + "不存在 !");
            }
            return outStr;
        }

        function getExcelFileName() {
            var d = new Date();
            var curYear = d.getYear();
            var curMonth = "" + (d.getMonth() + 1);
            var curDate = "" + d.getDate();
            var curHour = "" + d.getHours();
            var curMinute = "" + d.getMinutes();
            var curSecond = "" + d.getSeconds();
            if (curMonth.length == 1) {
                curMonth = "0" + curMonth;
            }

            if (curDate.length == 1) {
                curDate = "0" + curDate;
            }

            if (curHour.length == 1) {
                curHour = "0" + curHour;
            }

            if (curMinute.length == 1) {
                curMinute = "0" + curMinute;
            }

            if (curSecond.length == 1) {
                curSecond = "0" + curSecond;
            }
            var fileName = "table" + "_" + curYear + curMonth + curDate + "_"
                    + curHour + curMinute + curSecond + ".csv";
            return fileName;

        }

        function doFileExport(inName, inStr) {
            var xlsWin = null;
            if (!!document.all("glbHideFrm")) {
                xlsWin = glbHideFrm;
            }
            else {
                var width = 6;
                var height = 4;
                var openPara = "left=" + (window.screen.width / 2 - width / 2)
                        + ",top=" + (window.screen.height / 2 - height / 2)
                        + ",scrollbars=no,width=" + width + ",height=" + height;
              
                xlsWin = window.open("", "_blank", openPara);
            }
            xlsWin.document.write(inStr);
            xlsWin.document.close();
            xlsWin.document.execCommand('Saveas', true, inName);
            xlsWin.close();

        }

        //第四种
        function method4(tableid){

            var curTbl = document.getElementById(tableid);
            var oXL;
            try{
                oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
            }catch(e){
                alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，"+"那么请调整IE的安全级别。\n\n具体操作：\n\n"+"工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
                return false;
            }
            var oWB = oXL.Workbooks.Add(); //获取workbook对象
            var oSheet = oWB.ActiveSheet;//激活当前sheet
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl); //把表格中的内容移到TextRange中
            sel.select(); //全选TextRange中内容
            sel.execCommand("Copy");//复制TextRange中内容
            oSheet.Paste();//粘贴到活动的EXCEL中
            oXL.Visible = true; //设置excel可见属性
            var fname = oXL.Application.GetSaveAsFilename("将table导出到excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            oWB.SaveAs(fname);
            oWB.Close();
            oXL.Quit();
        }


        //第五种方法
        var idTmr;
        function  getExplorer() {
            var explorer = window.navigator.userAgent ;
            //ie
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //firefox
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome
            else if(explorer.indexOf("Chrome") >= 0){
                return 'Chrome';
            }
            //Opera
            else if(explorer.indexOf("Opera") >= 0){
                return 'Opera';
            }
            //Safari
            else if(explorer.indexOf("Safari") >= 0){
                return 'Safari';
            }
        }
        function method5(tableid) {
            if(getExplorer()=='ie')
            {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");
                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);
                    oWB.Close(savechanges = false);
                    oXL.Quit();
                    oXL = null;
                    idTmr = window.setInterval("Cleanup();", 1);
                }

            }
            else
            {
                tableToExcel(tableid)
            }
        }
        function Cleanup() {
            window.clearInterval(idTmr);
            CollectGarbage();
        }
        var tableToExcel = (function() {
            var uri = 'data:application/vnd.ms-excel;base64,',
                    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                    format = function(s, c) {
                        return s.replace(/{(\w+)}/g,
                                function(m, p) { return c[p]; }) }
            return function(table, name) {
                if (!table.nodeType) table = document.getElementById(table)
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                window.location.href = uri + base64(format(template, ctx))
            }
        })()
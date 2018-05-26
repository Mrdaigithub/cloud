package com.mrdaisite.android;

import com.mrdaisite.android.ui.Drive.DrivePresenter;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;

import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void test_getExt() {
        System.out.println(ResourceUtil.getINSTANCE().getExt("xx.png"));
    }

    @Test
    public void test_popPath() {
        System.out.println(ResourceUtil.getINSTANCE().popPath("0.61.100.1000"));
    }

    @Test
    public void test_formatISO8601() {
        System.out.println(ResourceUtil.getINSTANCE().formatISO8601("2018-03-12T10:04:47+08:00"));
    }

    @Test
    public void test_formatPath() {
        System.out.println(ResourceUtil.getINSTANCE().formatPath("0.1.2.3"));
    }

    @Test
    public void test_chunkResource() {
        try {
            byte bWrite[] = {11, 12, 13, 14};
            OutputStream outputStream = new FileOutputStream("./test.txt");
            for (int x = 0; x < bWrite.length; x++) {
                outputStream.write(bWrite[x]);
            }
            outputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void test_uploadChunk() {

    }
}
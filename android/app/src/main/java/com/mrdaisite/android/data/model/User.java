/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.mrdaisite.android.data.model;

import java.util.Date;

import io.objectbox.annotation.Entity;
import io.objectbox.annotation.Id;

@Entity
public class User {

    /**
     * id : 2
     * username : user1
     * email : user1@gmail.com
     * is_admin : false
     * capacity : 5368709120
     * used : 0
     * created_at : {"date":"2018-04-09 07:39:15.000000","timezone_type":3,"timezone":"Asia/Shanghai"}
     * updated_at : {"date":"2018-04-09 07:39:18.000000","timezone_type":3,"timezone":"Asia/Shanghai"}
     */

    @Id(assignable = true)
    private long id;
    private String username;
//    private String email;
//    private boolean is_admin;
//    private long capacity;
//    private int used;
//    private Date createdAt;
//    private Date updatedAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
//
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public boolean isIs_admin() {
//        return is_admin;
//    }
//
//    public void setIs_admin(boolean is_admin) {
//        this.is_admin = is_admin;
//    }
//
//    public long getCapacity() {
//        return capacity;
//    }
//
//    public void setCapacity(long capacity) {
//        this.capacity = capacity;
//    }
//
//    public int getUsed() {
//        return used;
//    }
//
//    public void setUsed(int used) {
//        this.used = used;
//    }
//
//    public Date getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(Date createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public Date getUpdatedAt() {
//        return updatedAt;
//    }
//
//    public void setUpdatedAt(Date updatedAt) {
//        this.updatedAt = updatedAt;
//    }
}

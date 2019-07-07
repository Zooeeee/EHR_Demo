package com.ehr.dao;

import com.ehr.model.Attendance;
import com.ehr.model.Empdata;
import com.ehr.model.pojo.AttendancePojo;
import com.ehr.model.pojo.AttendanceQiantai;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface AttendanceDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ehr_attendance
     *
     * @mbg.generated Sun Jun 23 21:49:02 CST 2019
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ehr_attendance
     *
     * @mbg.generated Sun Jun 23 21:49:02 CST 2019
     */
    int insert(Attendance record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ehr_attendance
     *
     * @mbg.generated Sun Jun 23 21:49:02 CST 2019
     */
    Attendance selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ehr_attendance
     *
     * @mbg.generated Sun Jun 23 21:49:02 CST 2019
     */
    List<Attendance> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ehr_attendance
     *
     * @mbg.generated Sun Jun 23 21:49:02 CST 2019
     */
    int updateByPrimaryKey(Attendance record);
    
    
    @Select("SELECT ehr_attendance.id,ehr_attendance.clockInTime,ehr_attendance.clockInIocation,ehr_attendance.tag,ehr_emp.`name`\r\n" + 
    		"FROM `ehr_attendance`,ehr_emp \r\n" + 
    		"WHERE ehr_attendance.emp_id=ehr_emp.id and emp_id = #{empId}")
    List<AttendancePojo> selectAllPojo(@Param("empId")Integer empId);
    
    @Select("SELECT ehr_attendance.id,ehr_attendance.clockInTime,ehr_attendance.clockInIocation,ehr_attendance.tag,ehr_emp.`name`\r\n" + 
    		"FROM `ehr_attendance`,ehr_emp \r\n" + 
    		"WHERE ehr_attendance.emp_id=ehr_emp.id")
    List<AttendanceQiantai> selectAllPojoqiantai();
    
    List<AttendanceQiantai> selectLike(@Param("name") String name,@Param("empId")Integer empId ,@Param("tag")Integer tag);

}
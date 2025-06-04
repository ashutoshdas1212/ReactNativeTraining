package com.basicnavigation23052025
 
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate
 
class MainActivity : ReactActivity() {
 
    override fun getMainComponentName(): String = "BasicNavigation23052025"
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
              loadApp(getMainComponentName())
    }
 
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(
            this,
            mainComponentName,
            DefaultNewArchitectureEntryPoint.getFabricEnabled()
        )
    }
}